import React, {useEffect} from 'react';
import {ThemeProvider} from '@emotion/react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import {WEBCLIENT_ID} from '@env';

import ThemeContext from '~/Utils/Hooks/ThemeContext';
import MainNavigation from './src/Navigation/MainNavigation';
import theme from './src/Style/Theme';
import useTheme from './src/Utils/Hooks/useTheme';
import {delay} from '~/Utils/Util';

function App() {
  const {ThemeMode, toggleTheme} = useTheme();

  const _init = async () => {
    GoogleSignin.configure({
      webClientId: WEBCLIENT_ID,
    });
    await delay(2000);
    SplashScreen.hide();
  };

  useEffect(() => {
    // App Start Initialize
    _init();
  }, []);

  return (
    <ThemeProvider theme={theme[ThemeMode]}>
      <ThemeContext.Provider value={{ThemeMode, toggleTheme}}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
