import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import ThemeContext from '~/Utils/Hooks/ThemeContext';

function ModeSwitch() {
  const {ThemeMode, toggleTheme} = useContext(ThemeContext);

  const lottieRef = React.useRef<AnimatedLottieView>(null);

  const onToggle = useCallback(() => {
    if (lottieRef.current) {
      AsyncStorage.setItem(
        'ThemeMode',
        ThemeMode === 'light' ? 'dark' : 'light',
      );
      toggleTheme(ThemeMode === 'light');

      if (ThemeMode === 'light') {
        // dark
        lottieRef.current.play(0, 90);
      } else {
        // light
        lottieRef.current.play(90, 180);
      }
    }
  }, [ThemeMode, toggleTheme]);

  useEffect(() => {
    if (lottieRef.current) {
      if (ThemeMode === 'light') {
        // dark
        lottieRef.current.play(0, 0);
      } else {
        // light
        lottieRef.current.play(90, 90);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button onPress={onToggle}>
      <AnimatedLottieView
        style={{width: 40, height: 40}}
        ref={lottieRef}
        source={require('~/Asset/Lottie/mode_switch.json')}
        loop={false}
        autoPlay={false}
        speed={3}
      />
    </Button>
  );
}

const Button = styled.TouchableOpacity``;

export default ModeSwitch;
