import React from 'react';
import styled from '@emotion/native';
import LongButton from '~/Component/Button/UI/Long';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

interface Props {}

function GoogleLoginButton({}: Props) {
  const onSignGoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Login Error', error);
    }
  };

  return (
    <LongButton onPress={onSignGoogle}>
      <Container>
        <Logo source={require('~/Asset/Image/google.png')} />
        <Label>Google로 로그인</Label>
      </Container>
    </LongButton>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding-horizontal: 10px;
  width: 100%;
  height: 44px;
  border-width: 1px;
  border-color: ${({theme}) => theme.borderColor};
  background-color: ${({theme}) => theme.backgroundColor};
`;

const Logo = styled.Image`
  width: 20px;
  height: 20px;
  resize-mode: contain;
`;

const Label = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px;
  color: ${({theme}) => theme.color};
`;

export default GoogleLoginButton;
