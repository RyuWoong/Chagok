import {useCallback, useEffect, useState} from 'react';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {daysType, dayType} from '~/../types/chagok';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';
import {getMonthSnapshot} from '~/Utils/DB';

/*
 * 날짜 값에 맞게 FireBase 데이터를 가져와 List로 변환해 뿌려줍니다.
 *  Home화면과 Statics화면에서 Focus되면 새롭게 데이터를 불러오는데
 * 다른 화면에서 다시 돌아왔을 때 (데이터의 수정 또는 변화가 없을 때)도 데이터를 불러오는 문제가 있습니다.
 * Firebase의 on()을 사용하면 데이터의 변화가 있을 때만 데이터를 불러오는데 이를 사용하면, date와 다른 리스트를 불러오는 문제가 있습니다.
 */

function useDate() {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState<daysType[] | null>(null);
  const [total, setTotal] = useState(0);

  const calculateTotal = useCallback((daysData: daysType[]) => {
    const totalValue = daysData.reduce((acc, day) => {
      return acc + day.total;
    }, 0);
    return totalValue;
  }, []);

  const makeDaysList = useCallback(
    (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
      const data: {[key: string]: dayType[]} = snapshot.val();
      const days = data ? Object.keys(data) : [];
      const daysData = days.map(day => {
        const dayArr = Object.entries(data[day]).map(([key, value]) => ({
          ...value,
          id: key,
        }));

        return {
          title: day,
          data: dayArr,
          total: dayArr.reduce((prev, now) => prev + Number(now.price), 0),
        };
      });

      return daysData;
    },
    [],
  );

  const _initData = useCallback(
    async (nowDate: Date) => {
      try {
        const snapshot = await getMonthSnapshot(nowDate);
        if (!snapshot) {
          throw new Error();
        }
        const daysList = makeDaysList(snapshot);
        setList(daysList);
        const totalValue = calculateTotal(daysList);
        setTotal(totalValue);
      } catch (error) {
        Alert.alert('데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
      }
    },
    [makeDaysList, calculateTotal],
  );

  useEffect(() => {
    if (isFocused) {
      _initData(date);
    }
  }, [date, _initData, isFocused]);

  return {date, list, total, handleDate: setDate};
}

export default useDate;
