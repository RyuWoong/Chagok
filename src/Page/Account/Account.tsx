import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import BackButton from '~/Component/Button/BackButton/BackButton';
import Header from '~/Component/Header/UI/Header';
import {AlertModal, useAlert} from '~/Component/Modal/AlertModal';
import {MainNavigationParamList} from '~/Navigation/navigation';
import {currentUserInfo, exitUser} from '~/Utils/DB';
import auth from '@react-native-firebase/auth';
import Menu from '~/Component/Button/Menu/Menu';
import ContainerView from '~/Component/View/ContainerView/ContainerView';
import ContentView from '~/Component/View/ContentView/ContentView';
import {delay} from '~/Utils/Util';

type AccountPageProps = NativeStackScreenProps<
  MainNavigationParamList,
  'Account'
>;

interface Props {
  navigation: AccountPageProps['navigation'];
}

function Account({navigation}: Props) {
  const {visible, alert, openAlert, closeAlert} = useAlert();

  const onLogout = useCallback(async () => {
    try {
      closeAlert();
      await delay(500);
      await auth().signOut();
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (error) {
      console.log(error);
    }
  }, [navigation, closeAlert]);

  const onDelete = useCallback(async () => {
    closeAlert();
    await delay(500);
    await exitUser();
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  }, [closeAlert, navigation]);

  const doLogout = () => {
    openAlert({
      message: '로그아웃 하실래요?',
      onConfirm: onLogout,
    });
  };

  const doExit = () => {
    openAlert({
      message: '차곡을 그만 이용 하실려구요?\n모든 내역이 삭제 돼요!',
      onConfirm: onDelete,
    });
  };

  useEffect(() => {
    const {isAnonymous} = currentUserInfo()!;
    console.log(isAnonymous);
  }, []);
  return (
    <ContainerView>
      <Header>
        <Header.Left>
          <BackButton onPress={() => navigation.goBack()} />
        </Header.Left>
        <Header.Title>계정 관리</Header.Title>
      </Header>
      <ContentView>
        <Menu onPress={doExit} error>
          회원 탈퇴
        </Menu>
        <Menu onPress={doLogout}>로그아웃</Menu>
      </ContentView>
      <AlertModal
        visible={visible}
        title={alert?.title}
        message={alert?.message}
        onConfirm={alert?.onConfirm}
        onCancel={closeAlert}
      />
    </ContainerView>
  );
}

export default Account;
