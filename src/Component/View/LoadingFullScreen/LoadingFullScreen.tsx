import React from 'react';
import styled from '@emotion/native';
import AnimatedLottieView from 'lottie-react-native';

function LoadingFullScreen() {
  return (
    <Container>
      <AnimatedLottieView
        source={require('~/Asset/Lottie/loading.json')}
        loop={true}
        autoPlay
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
        }}
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.backgroundColor};
`;

export default LoadingFullScreen;
