import dayjs from 'dayjs';
import {useCallback, useState} from 'react';

function useMonthDateList() {
  const [list, setList] = useState(
    new Array(20)
      .fill(null)
      .map((_, i) => dayjs().subtract(i, 'month').toDate()),
  );

  const moreDate = useCallback(() => {
    const nextDate = dayjs(list[list.length - 1])
      .subtract(1, 'month')
      .toDate();
    const newDate = new Array(20)
      .fill(null)
      .map((_, i) => dayjs(nextDate).subtract(i, 'month').toDate());
    setList(prev => prev.concat(newDate));
  }, [list]);

  return {list, moreDate};
}

export default useMonthDateList;
