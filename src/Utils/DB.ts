import {DB_URL} from '@env';
import {firebase} from '@react-native-firebase/database';
import dayjs from 'dayjs';
import {dbDayType} from '~/../types/chagok';
import {CATEGROY} from './constant';

export const currentUserInfo = () => firebase.auth().currentUser;

export const initialData = (email: string) => {
  const data: dbDayType = {
    category: CATEGROY[0],
    price: 10000,
    title: '반가워요!',
    date: dayjs().format('YYYY-MM-DD'),
    timestamp: Date.now(),
  };

  return {
    email,
    data: {
      [dayjs().format('YYYY-MM')]: {
        [dayjs().date()]: {
          frist: data,
          second: {...data, title: '소비를 추가해봐요.'},
        },
      },
    },
  };
};

export const userDB = (uid: string) =>
  firebase.app().database(DB_URL).ref().child('user').child(uid);

export const getMonthSnapshot = async (date: Date) => {
  const user = currentUserInfo();
  if (!user) {
    return;
  }
  const targetDB = firebase
    .app()
    .database(DB_URL)
    .ref()
    .child(`user/${user.uid}/data/${dayjs(date).format('YYYY-MM')}`);
  const snapshot = await targetDB.once('value');
  return snapshot;
};

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
