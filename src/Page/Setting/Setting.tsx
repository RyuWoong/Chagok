import React, {useCallback} from 'react';
import {Linking, ScrollView} from 'react-native';
import styled from '@emotion/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Content} from '~/Style/Global';
import Fonts from '~/Style/Fonts';
import {MainNavigationParamList} from '~/Navigation/navigation';

import UserInfo from './Component/UserInfo';
import PolicyButton from './Component/PolicyButton';
import Menu from '~/Component/Button/Menu/Menu';

type SettingPageProps = NativeStackScreenProps<MainNavigationParamList, 'Main'>;
interface Props {
  navigation: SettingPageProps['navigation'];
}

function Setting({navigation}: Props) {
  const goAccount = useCallback(() => {
    navigation.navigate('Account');
  }, [navigation]);

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
          <Menu onPress={goAccount}>계정 관리</Menu>
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
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
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
