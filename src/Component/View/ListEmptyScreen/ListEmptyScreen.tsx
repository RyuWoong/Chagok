import styled from '@emotion/native';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import Fonts from '~/Style/Fonts';

function ListEmptyScreen() {
  return (
    <Container>
      <AnimatedLottieView
        source={require('~/Asset/Lottie/empty.json')}
        loop={true}
        autoPlay
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
        }}
      />
      <Label>작성된 내역이 없어요!</Label>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.backgroundColor};
`;

const Label = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.primaryColor};
  font-family: ${Fonts.DNFBitBitOTF};
`;

export default ListEmptyScreen;
