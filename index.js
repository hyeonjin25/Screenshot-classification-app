/**
 * @format
 */

import * as React from 'react';
import {Alert, AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {RecoilRoot} from 'recoil';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from 'react-native-recoil-persist';
import {theme} from './src/utils/GlobalStyles';
import {ThemeProvider} from '@rneui/themed';

export default function Main() {

  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
}

AppRegistry.registerComponent(appName, () => Main);
