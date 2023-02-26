import {useReducer} from 'react';
import {Category} from '~/../types/chagok';

const initialState = {
  category: '식비' as Category,
  title: '',
  price: 0,
  date: new Date(),
};

interface categoryAction {
  type: 'category';
  payload: Category;
}

interface titleAction {
  type: 'title';
  payload: string;
}

interface priceAction {
  type: 'price';
  payload: number;
}

interface dateAction {
  type: 'date';
  payload: Date;
}

type ActionType = categoryAction | titleAction | priceAction | dateAction;

function spendFormReducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'category':
      return {...state, category: action.payload};
    case 'title':
      return {...state, title: action.payload};
    case 'price':
      return {...state, price: action.payload};
    case 'date':
      return {...state, date: action.payload};
    default:
      throw new Error('SpendForm Reducer Error');
  }
}

function useSpendForm(init?: typeof initialState) {
  const [state, dispatch] = useReducer(spendFormReducer, init ?? initialState);
  const setState = (type: keyof typeof initialState, payload: any) =>
    dispatch({type, payload});

  return {...state, setState};
}
export default useSpendForm;
