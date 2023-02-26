import React, {ReactNode} from 'react';
import useDate from '../Hook/useDate';
import MonthlyList from './MonthlyList';
import MonthlyTotal from './MonthlyTotal';
import MonthlyContext from './MonthlyContext';

interface Props {
  children: ReactNode;
}

function Monthly({children}: Props) {
  const value = useDate();

  return (
    <MonthlyContext.Provider value={value}>{children}</MonthlyContext.Provider>
  );
}

Monthly.List = MonthlyList;
Monthly.Total = MonthlyTotal;

export default Monthly;
