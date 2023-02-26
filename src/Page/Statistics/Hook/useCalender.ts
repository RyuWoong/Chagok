import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

function useCalendar() {
  const [date, setDate] = useState(dayjs());
  const [list, setList] = useState<number[][] | null>(null);

  const onPrev = () => {
    setDate(date.subtract(1, 'month'));
  };

  const onNext = () => {
    setDate(date.add(1, 'month'));
  };

  const makeCalendar = (date: dayjs.Dayjs) => {
    const startDay = date.startOf('month').day();
    const endDay = date.endOf('month').day();
    const endDayOfLastMonth = date.subtract(1, 'month').endOf('month').date();
    const endDayOfThisMonth = date.endOf('month').date();

    const prevDates = new Array(startDay).fill(0).map((_, i) => {
      return endDayOfLastMonth - startDay + i + 1;
    });

    const thisDates = new Array(endDayOfThisMonth).fill(0).map((_, i) => {
      return i + 1;
    });

    const nextDates = new Array(6 - endDay).fill(0).map((_, i) => {
      return i + 1;
    });

    const dates = [...prevDates, ...thisDates, ...nextDates];

    const weeks = new Array(6).fill(0).map((_, i) => {
      return dates.slice(i * 7, i * 7 + 7);
    });
    setList(weeks);
  };

  useEffect(() => {
    makeCalendar(date);
  }, [date]);

  return {date, list, onPrev, onNext};
}

export default useCalendar;
