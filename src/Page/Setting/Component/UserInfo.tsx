import styled from '@emotion/native';
import React from 'react';
import Fonts from '~/Style/Fonts';
import {currentUserInfo} from '~/Utils/DB';
import ModeSwitch from './ModeSwitch';

function UserInfo() {
  const user = currentUserInfo();

  return (
    <Container>
      <Logo source={require('~/Asset/Image/logo.png')} />
      <WelcomeBox>
        <Welcome>반가워요!</Welcome>
        <Email>{user?.email ? user?.email?.split('@')[0] : '손'}님</Email>
      </WelcomeBox>
      <ModeSwitch />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.borderColor};
`;

const Logo = styled.Image`
  width: 50px;
  height: undefined;
  aspect-ratio: 1;
`;

const WelcomeBox = styled.View`
  flex: 1;
  padding-horizontal: 10px;
`;

const Welcome = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${({theme}) => theme.primaryColor};
  font-family: ${Fonts.DNFBitBitOTF};
`;

const Email = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${({theme}) => theme.color};
  font-family: ${Fonts.DNFBitBitOTF};
`;

export default UserInfo;
