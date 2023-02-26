import Lottie from 'lottie-react-native';
import React, {useEffect, useRef} from 'react';

function LottieLogin() {
  const LottieRef = useRef<Lottie>(null);

  useEffect(() => {
    LottieRef.current?.play(0, 55);
  }, [LottieRef]);

  return (
    <Lottie
      ref={LottieRef}
      source={require('~/Asset/Lottie/money.json')}
      loop={true}
      resizeMode="cover"
      style={{
        width: '100%',
        height: undefined,
        aspectRatio: 1,
      }}
    />
  );
}

export default LottieLogin;
