/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';


function App() {

  const backgroundStyle = {
    backgroundColor: 'beige',
    flex:1
  };

  const RNFS = require('react-native-fs');

  RNFS.readDir(RNFS.ExternalStorageDirectoryPath+'/DCIM/Screenshots' ) 
  .then((result) => {
    console.log('GOT RESULT', result);

    return result.map((res)=>(
      [RNFS.stat(res.path), res.path]
    )) 
  })
  .then((statResult) => {
    console.log('statResult', statResult);
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[0]);
    }

    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents);
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>안농</Text>
    </SafeAreaView>
  );
}

export default App;
