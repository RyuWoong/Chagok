import dayjs from 'dayjs';
import {useState} from 'react';

function useMonthDateList() {
  const [list, setList] = useState(
    new Array(50)
      .fill(null)
      .map((_, i) => dayjs().subtract(i, 'month').toDate()),
  );

  const moreDate = () => {
    const lastDate = list[list.length - 1];
    const newDate = new Array(50)
      .fill(null)
      .map((_, i) => dayjs(lastDate).subtract(i, 'month').toDate());
    setList(prev => prev.concat(newDate));
  };

  return {list, moreDate};
}

export default useMonthDateList;
