import React, {useCallback, useEffect, useState} from 'react';
import {Container} from '~/Style/Global';

import styled from '@emotion/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainNavigationParamList} from '~/Navigation/navigation';
import {initialData, userDB} from '~/Utils/DB';
import GoogleLoginButton from './Component/GoogleLoginButton';
import AppleLoginButton from './Component/AppleLoginButton';

import {Platform} from 'react-native';
import LottieLogin from './Component/LottieLogin';
import GuestLoginButton from './Component/GuestLoginButton';
import LoadingModal from '~/Component/Modal/LoadingModal.tsx/LoadingModal';

type LoginPageProps = NativeStackScreenProps<MainNavigationParamList, 'Login'>;

interface Props {
  navigation: LoginPageProps['navigation'];
}

function Login({navigation}: Props) {
  const [isLoading, setLoading] = useState(false);

  const reqSign = useCallback(
    (uid: string, email: string) => {
      const fbUserDBContext = userDB(uid);
      fbUserDBContext.once('value', data => {
        // data가 없다면 유저가 처음 로그인한 것이므로 초기 데이터를 넣어줍니다.
        if (!data.exists()) {
          fbUserDBContext.set(initialData(email));
        }
        setLoading(false);
        // 메인 화면으로 로그인 처리.
      });
      setTimeout(() => {
        navigation.replace('Main');
      }, 100);
    },
    [navigation],
  );

  const handleLogin = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      // User가 존재하지 않거나,
      // 이미 로그인이 되어 있을 때 Debounce를 걸어 navigation을 여러번 실행시키는 것을 방지합니다.
      if (!user || !user.uid) {
        setLoading(false);
        return;
      }
      const {uid, email} = user;
      reqSign(uid, email ?? 'guest');
    },
    [reqSign],
  );

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      // Firebase로그인이 되거나 로그아웃 되면 동작합니다.
      handleLogin(user);
    });
  }, [handleLogin]);

  return (
    <Container>
      <LottieGroup>
        <LottieLogin />
      </LottieGroup>
      <ButtonGroup>
        <GoogleLoginButton setLoading={setLoading} />
        {Platform.OS === 'ios' && <AppleLoginButton setLoading={setLoading} />}
        <GuestLoginButton setLoading={setLoading} />
      </ButtonGroup>
      <LoadingModal visible={isLoading} />
    </Container>
  );
}

const LottieGroup = styled.View`
  flex: 3;
  align-items: center;
  padding: 20px;
`;

const ButtonGroup = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-horizontal: 20px;
  padding-vertical: 25%;
  gap: 10px;
`;

export default Login;
