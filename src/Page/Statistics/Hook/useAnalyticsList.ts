import {useCallback, useEffect, useState} from 'react';
import {Category, daysType} from '~/../types/chagok';

function useAnalyticsList() {
  const [list, setList] = useState<daysType[] | null>();
  const [filterList, setFilterList] = useState<daysType[] | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (list) {
      setFilterList(
        list
          .map(item => {
            const data = item.data.filter(day => {
              if (category === null) {
                return true;
              }
              return day.category === category;
            });
            const total = data.reduce((acc, cur) => acc + cur.price, 0);
            return {...item, total, data};
          })
          .filter(item => item.data.length > 0),
      );
    }
  }, [list, category]);

  const handleCategory = useCallback((categoryValue: Category | null) => {
    setCategory(categoryValue);
  }, []);

  const setBaseList = useCallback((value: daysType[]) => setList(value), []);

  return {filterList, category, setBaseList, handleCategory};
}

export default useAnalyticsList;
