import React from 'react';
import styled from '@emotion/native';
import LongButton from '~/Component/Button/UI/Long';
import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

import {useTheme} from '@emotion/react';

interface Props {
  setLoading: (value: boolean) => void;
}

function AppleLoginButton({setLoading}: Props) {
  const theme = useTheme();

  const onSignApple = async () => {
    setLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const {identityToken, nonce} = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error('Apple Sign-In failed');
      }
      // 3). create a Firebase `AppleAuthProvider` credential
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      await auth().signInWithCredential(appleCredential);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <LongButton onPress={onSignApple}>
      <Container>
        <Logo
          source={
            theme.mode === 'light'
              ? require('~/Asset/Image/apple_light.png')
              : require('~/Asset/Image/apple_dark.png')
          }
        />
        <Label>Apple로 로그인</Label>
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
  border-color: ${({theme}) => theme.reverseBackgroundColor};
  background-color: ${({theme}) => theme.reverseBackgroundColor};
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
  color: ${({theme}) => theme.reverseColor};
`;

export default AppleLoginButton;
