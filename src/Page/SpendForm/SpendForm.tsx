import React, {useCallback, useMemo, useState} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import {Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {dbDayType} from '~/../types/chagok';
import PrimaryButton from '~/Component/Button/UI/Primary';
import Header from '~/Component/Header/UI/Header';
import {AlertModal, useAlert} from '~/Component/Modal/AlertModal';
import KeyboardView from '~/Component/View/KeyboardView/KeyboardView';
import {MainNavigationParamList} from '~/Navigation/navigation';
import {currentUserInfo, userDB} from '~/Utils/DB';
import CategoryPickerLabel from './Component/CategoryPickerLabel';
import DatePickerLabel from './Component/DatePickerLabel';
import DownArrowButton from './Component/DownArrowButton';
import LabelInput from './Component/LabelInput';
import useSpendForm from './Hook/useSpendForm';

type AccountFormPageProps = NativeStackScreenProps<
  MainNavigationParamList,
  'Form'
>;

interface Props {
  navigation: AccountFormPageProps['navigation'];
  route: AccountFormPageProps['route'];
}

function SpendForm({navigation, route}: Props) {
  const theme = useTheme();
  const TITLE = useMemo(
    () => (route.params ? '소비 수정' : '소비 추가'),
    [route.params],
  );

  const {
    category,
    date,
    title,
    price,
    handleCategory,
    handleDate,
    handleTitle,
    handlePrice,
  } = useSpendForm(
    route.params
      ? {...route.params, date: dayjs(route.params.date).toDate()}
      : undefined,
  );
  const {visible, alert, openAlert, closeAlert} = useAlert();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const onToggle = useCallback(() => {
    setIsDatePickerVisible(prev => !prev);
  }, [setIsDatePickerVisible]);

  const pickDate = useCallback(
    (value: Date) => {
      handleDate(value);
      onToggle();
    },
    [handleDate, onToggle],
  );

  const formCheck = useCallback(() => {
    const user = currentUserInfo();
    if (!user) {
      throw new Error('유저 정보가 없습니다.');
    }
    console.log(user.uid);
    return user;
  }, []);

  const handleData = () => {
    const user = formCheck();
    const db = userDB(user.uid);
    const nowDate = dayjs(date);
    const yearMonth = nowDate.format('YYYY-MM');
    const day = nowDate.format('DD');
    const newData: dbDayType = {
      category,
      title,
      price: Number(price),
      date: nowDate.format('YYYY-MM-DD'),
      timestamp: Date.now(),
    };

    return {db, nowDate, newData, yearMonth, day};
  };

  const onSave = () => {
    try {
      const {db, newData, yearMonth, day} = handleData();
      db.child(`data/${yearMonth}/${day}`).push(newData, () => {
        navigation.goBack();
      });
    } catch (error: any) {
      Alert.alert('알림', error.message as string);
    }
  };

  const onUpdate = () => {
    try {
      const {db, nowDate, newData, yearMonth, day} = handleData();
      const prevDate = dayjs(route.params!.date);
      // 날짜가 변경된 경우
      if (prevDate.format('YYYY-MM-DD') !== nowDate.format('YYYY-MM-DD')) {
        db.child(
          `data/${prevDate.format('YYYY-MM')}/${prevDate.format('DD')}/${
            route.params!.id
          }`,
        ).remove();
        db.child(`data/${yearMonth}/${day}`).push(newData, () => {
          navigation.goBack();
        });
      } else {
        // 날짜는 그대로인 경우
        db.child(`data/${yearMonth}/${day}/${route.params?.id}`).update(
          newData,
          () => {
            navigation.goBack();
          },
        );
      }
    } catch (error: any) {
      Alert.alert('알림', error.meesage as string);
    }
  };

  const onDelete = useCallback(() => {
    try {
      const user = formCheck();
      const db = userDB(user.uid);
      const prevDate = dayjs(route.params!.date);
      const yearMonth = prevDate.format('YYYY-MM');
      const day = prevDate.format('D');
      console.log(db.child(`data/${yearMonth}/${day}/${route.params!.id}`));
      db.child(`data/${yearMonth}/${day}/${route.params!.id}`).remove(err => {
        if (err) {
          throw new Error('삭제에 실패했습니다.');
        }
        navigation.goBack();
      });
    } catch (error: any) {
      Alert.alert('알림', error.message as string);
    }
  }, [formCheck, navigation, route.params]);

  const showAlert = useCallback(() => {
    openAlert({message: '이 소비내역을 삭제하시겠어요?', onConfirm: onDelete});
  }, [openAlert, onDelete]);

  return (
    <Container>
      <Header>
        <Header.Title>{TITLE}</Header.Title>
        <Header.Right>
          <DownArrowButton onPress={navigation.goBack} />
        </Header.Right>
      </Header>
      <Content>
        <ScrollView bounces={false}>
          <DatePickerLabel date={date} onPress={onToggle} />
          <CategoryPickerLabel
            title="카테고리"
            category={category}
            handleCategory={handleCategory}
          />
          <LabelInput
            label="소비 내용"
            placeholder="소비 내용을 간단하게 입력해주세요."
            maxLength={30}
            value={title}
            onChangeText={handleTitle}
          />
          <LabelInput
            label="소비 금액"
            placeholder="소비 금액을 입력해주세요."
            inputMode="numeric"
            maxLength={10}
            value={price.toString()}
            onChangeText={handlePrice}
            clearTextOnFocus
          />
        </ScrollView>
      </Content>
      <ButtonGroup>
        {route.params && (
          <PrimaryButton
            label={'소비 삭제'}
            onPress={showAlert}
            backgroundColor={theme.error}
          />
        )}
        <PrimaryButton
          label={TITLE}
          onPress={route.params ? onUpdate : onSave}
        />
      </ButtonGroup>
      <DatePicker
        modal
        date={date}
        mode="date"
        locale="ko"
        title={'날짜를 선택해요'}
        confirmText="확인"
        cancelText="취소"
        open={isDatePickerVisible}
        onConfirm={pickDate}
        onCancel={onToggle}
      />
      <AlertModal
        visible={visible}
        title={alert?.title}
        message={alert?.message}
        onConfirm={alert?.onConfirm}
        onCancel={closeAlert}
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
`;

const ScrollView = styled.ScrollView``;

const Content = styled(KeyboardView)`
  padding-horizontal: 20px;
`;

const ButtonGroup = styled.View`
  padding: 20px;
  gap: 10px;
`;

export default SpendForm;
