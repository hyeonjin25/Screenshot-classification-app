import {Dimensions} from 'react-native';

//
// size
//
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const AppSize = {
  windowWidth,
  windowHeight,
};

//
// color
//
export const AppColor = {
  primary: '#DBE2EF',
  secondary: '#3F72AF',
  white: '#F9F7F7',
  dark: '#112D4E',
  gray: 'gray',
};

export const theme = {
  colors: {
    primary: '#DBE2EF',
    secondary: '#3F72AF',
  },
};
