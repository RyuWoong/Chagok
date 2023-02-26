import {createContext} from 'react';

const ThemeContext = createContext({
  ThemeMode: 'light',
  toggleTheme: (value: boolean) => {
    console.log(value);
  },
});

export default ThemeContext;
