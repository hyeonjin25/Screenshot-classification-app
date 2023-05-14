/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';
import {RecoilRoot} from 'recoil';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function Main() {
  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
}

AppRegistry.registerComponent(appName, () => Main);
