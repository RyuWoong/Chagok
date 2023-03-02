import React from 'react';
import styled from '@emotion/native';
import LongButton from '~/Component/Button/UI/Long';
import auth from '@react-native-firebase/auth';
import GuestIcon from '~/Asset/Image/guest.svg';
import {useTheme} from '@emotion/react';

/*
 *  게스트 로그인 버튼 추가.
 *
 */

interface Props {
  setLoading: (value: boolean) => void;
}
function GuestLoginButton({setLoading}: Props) {
  const theme = useTheme();
  const onSignGuest = async () => {
    try {
      setLoading(true);
      const sign = await auth().signInAnonymously();
      console.log(sign);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <LongButton onPress={onSignGuest}>
      <Container>
        <GuestIcon width={24} height={24} color={theme.primaryColor} />
        <Label>손님으로 로그인</Label>
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
  border-color: ${({theme}) => theme.primaryColor};
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
  color: ${({theme}) => theme.primaryColor};
`;

export default GuestLoginButton;
