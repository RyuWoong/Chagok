import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Appearance, Platform, StatusBar} from 'react-native';
import palette from '~/Style/Palette';

function useTheme() {
  type ThemeType = 'light' | 'dark';

  const colorMode = Appearance.getColorScheme() ?? 'light';
  const [ThemeMode, setThmeMode] = useState<ThemeType>(colorMode);

  const toggleTheme = (mode: boolean) => {
    setThmeMode(mode ? 'dark' : 'light');
  };

  useEffect(() => {
    AsyncStorage.getItem('ThemeMode').then(mode => {
      if (mode) {
        setThmeMode(mode as ThemeType);
      }
    });
  }, []);

  useEffect(() => {
    if (ThemeMode === 'light') {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(palette.white);
      }
    } else {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(palette.black);
      }
    }
  }, [ThemeMode]);

  return {ThemeMode, toggleTheme};
}

export default useTheme;
