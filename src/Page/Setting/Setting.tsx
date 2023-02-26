import React, {useCallback} from 'react';
import {Alert, Linking, ScrollView} from 'react-native';
import styled from '@emotion/native';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Content} from '~/Style/Global';
import Fonts from '~/Style/Fonts';
import {MainNavigationParamList} from '~/Navigation/navigation';

import {AlertModal} from '~/Component/Modal/AlertModal/AlertModal';
import {useAlert} from '~/Component/Modal/AlertModal';
import UserInfo from './Component/UserInfo';
import PolicyButton from './Component/PolicyButton';
import {currentUserInfo, userDB} from '~/Utils/DB';

type SettingPageProps = NativeStackScreenProps<MainNavigationParamList, 'Main'>;
interface Props {
  navigation: SettingPageProps['navigation'];
}

function Setting({navigation}: Props) {
  const {visible, alert, openAlert, closeAlert} = useAlert();

  const onLogout = useCallback(() => {
    closeAlert();
    auth()
      .signOut()
      .then(() => {
        setTimeout(() => {
          navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }, 500);
      });
  }, [navigation, closeAlert]);

  const onDelete = useCallback(() => {
    closeAlert();
    setTimeout(() => {
      const user = currentUserInfo();
      const db = userDB(user!.uid);
      db.remove(async err => {
        if (err) {
          Alert.alert(err.message);
        } else {
          await user?.delete();
          navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }
      });
    }, 500);
  }, [navigation, closeAlert]);

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

  const openPrivacyPolicy = useCallback(async () => {
    await Linking.openURL(
      'https://ryuwoong.notion.site/87ed4071103b4970a64720244bf6d967',
    );
  }, []);

  const openPatchNote = useCallback(async () => {
    await Linking.openURL(
      'https://ryuwoong.notion.site/fce599a7ef01499fa7e648e9858fd5dd',
    );
  }, []);

  return (
    <Container>
      <UserInfo />
      <Content>
        <ScrollView bounces={false}>
          <Menu>
            <MenuTouch onPress={doExit}>
              <MenuLabel error>회원탈퇴</MenuLabel>
            </MenuTouch>
          </Menu>
          <Menu>
            <MenuTouch onPress={doLogout}>
              <MenuLabel>로그아웃</MenuLabel>
            </MenuTouch>
          </Menu>
        </ScrollView>
      </Content>
      <Footer>
        <Wrap>
          <LogoLabel>차곡</LogoLabel>
          <Version>1.0.1</Version>
        </Wrap>
        <CopyRight>RyuWoong © 2023. All rights reserved.</CopyRight>
        <PolicyBox>
          <PolicyButton onPress={openPrivacyPolicy}>
            개인정보 처리 방침
          </PolicyButton>
          <PolicyButton onPress={openPatchNote}>패치 노트</PolicyButton>
        </PolicyBox>
      </Footer>
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

const Menu = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.borderColor};
`;

const MenuTouch = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const MenuLabel = styled.Text<{error?: boolean}>`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${({error, theme}) => (error ? theme.error : theme.color)};
`;

const Footer = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 10px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.borderColor};
`;

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const LogoLabel = styled.Text`
  font-family: ${Fonts.DNFBitBitOTF};
  font-size: 14px;
  color: ${({theme}) => theme.primaryColor};
  text-align: center;
`;

const CopyRight = styled.Text`
  color: ${({theme}) => theme.subColor};
  font-size: 12px;
  text-align: center;
`;

const PolicyBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Version = styled.Text`
  color: ${({theme}) => theme.color};
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

export default Setting;
