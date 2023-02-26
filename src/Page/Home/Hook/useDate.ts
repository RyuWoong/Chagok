import dayjs from 'dayjs';
import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {daysType, dayType} from '~/../types/chagok';
import {DB_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';

function useDate() {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState<daysType[] | null>(null);
  const [total, setTotal] = useState(0);

  const handleDate = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const _initData = useCallback((date: Date) => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }
    const snapshopt = firebase
      .app()
      .database(DB_URL)
      .ref()
      .child(`user/${user.uid}/data/${dayjs(date).format('YYYY-MM')}`);
    snapshopt.once('value', snapshot => {
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

      setList(daysData);

      const monthTotal = daysData.reduce((acc, day) => {
        return acc + day.total;
      }, 0);
      setTotal(monthTotal);
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('_init 실행');
      _initData(date);
    }
  }, [date, _initData, isFocused]);

  return {date, list, total, handleDate};
}

export default useDate;
