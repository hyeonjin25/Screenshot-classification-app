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
  primary: '#F0F0F0',
  secondary: '#379CFF',
  white: '#F9F7F7',
  dark: '#112D4E',
  gray: 'gray',
  body: '#F0F0F0',
};

export const theme = {
  colors: {
    primary: AppColor.primary,
    secondary: AppColor.secondary,
  },
  components: {
    Text: {
      style: {
        color: 'black',
      },
      h1Style: {
        fontSize: 24,
      },
      h2Style: {
        fontSize: 22,
      },
      h3Style: {
        fontSize: 19,
      },
      h4Style: {
        fontSize: 16,
      },
    },
  },
};
