import {createContext} from 'react';
import useDate from '../Hook/useDate';

type MonthlyContextType = ReturnType<typeof useDate>;

const MonthlyContext = createContext<MonthlyContextType>({
  date: new Date(),
  list: null,
  total: 0,
  handleDate: () => {},
});

export default MonthlyContext;
