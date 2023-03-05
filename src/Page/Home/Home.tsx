import styled from '@emotion/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {MainNavigationParamList} from '~/Navigation/navigation';
import Header from '../../Component/Header/UI/Header';
import FabButton from './Component/FabButton';
import Monthly from './Component/Monthly';
import Fonts from '~/Style/Fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import ContentView from '~/Component/View/ContentView/ContentView';

export type HomePageProps = NativeStackScreenProps<
  MainNavigationParamList,
  'Main'
>;

interface Props {
  navigation: HomePageProps['navigation'];
}

function Home({navigation}: Props) {
  const goForm = useCallback(() => {
    navigation.navigate('Form');
  }, [navigation]);

  return (
    <Container edges={['top', 'left', 'right']}>
      <Header>
        <Header.Left>
          <Logo source={require('~/Asset/Image/logo.png')} />
          <LogoBox>
            <Label>소비 내역을</Label>
            <H1>차곡! 차곡!</H1>
          </LogoBox>
        </Header.Left>
      </Header>
      <ContentView>
        <Monthly>
          <Monthly.Total />
          <Monthly.List />
        </Monthly>
      </ContentView>
      <FabButton onPress={goForm} />
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
`;

const LogoBox = styled.View`
  padding-horizontal: 10px;
`;

const Logo = styled.Image`
  width: 44px;
  height: undefined;
  aspect-ratio: 1;
`;

const Label = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.primaryColor};
  font-family: ${Fonts.DNFBitBitOTF};
`;

const H1 = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.primaryColor};
  font-family: ${Fonts.DNFBitBitOTF};
`;

export default Home;
