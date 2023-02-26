import palette from './Palette';

const theme = {
  light: {
    mode: 'light',
    color: palette.black0,
    subColor: palette.black,
    reverseColor: palette.white,
    backgroundColor: palette.white,
    subBackgroundColor: palette.white0,
    reverseBackgroundColor: palette.black,
    borderColor: palette.grey,
    primaryColor: palette.green1,
    error: palette.red,
  },
  dark: {
    mode: 'dark',
    color: palette.white,
    subColor: palette.white0,
    reverseColor: palette.black,
    backgroundColor: palette.black,
    subBackgroundColor: palette.black0,
    reverseBackgroundColor: palette.white,
    borderColor: palette.grey,
    primaryColor: palette.green0,
    error: palette.red,
  },
};

export default theme;
