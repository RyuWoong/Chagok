import {DB_URL} from '@env';
import {firebase} from '@react-native-firebase/database';
import dayjs from 'dayjs';
import {dbDayType} from '~/../types/chagok';
import {CATEGROY} from './constant';

export const initialData = (email: string) => {
  const data: dbDayType = {
    category: CATEGROY[0],
    price: 10000,
    title: '안녕하세요',
    date: dayjs().format('YYYY-MM-DD'),
    timestamp: Date.now(),
  };
  return {
    email,
    data: {
      [dayjs().format('YYYY-MM')]: {
        [dayjs().date()]: {
          frist: data,
          second: data,
        },
      },
    },
  };
};

export const userDB = (uid: string) =>
  firebase.app().database(DB_URL).ref().child('user').child(uid);

export const exitUser = async () => {
  try {
    const user = currentUserInfo();
    const db = userDB(user!.uid);
    await db.remove();
    await user?.delete();
  } catch (err) {
    console.error(err);
  }
};

export const currentUserInfo = () => firebase.auth().currentUser;
