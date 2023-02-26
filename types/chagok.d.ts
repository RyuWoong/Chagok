import {CATEGROY} from '~/Utils/constant';

export type Category = (typeof CATEGROY)[number];

export type dbDayType = Omit<dayType, 'id'>;

export type dayType = {
  id: string;
  category: Category;
  title: string;
  price: number;
  date: string;
  timestamp: number;
};

export interface daysType {
  title: string;
  data: dayType[];
  total: number;
}
