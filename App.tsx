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

function App() {
  const {ThemeMode, toggleTheme} = useTheme();

  useEffect(() => {
    // App Start Initialize
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    GoogleSignin.configure({
      webClientId: WEBCLIENT_ID,
    });
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
