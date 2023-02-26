import {useContext} from 'react';
import MonthlyContext from '../Component/MonthlyContext';

function useMonthly() {
  return useContext(MonthlyContext);
}

export default useMonthly;
