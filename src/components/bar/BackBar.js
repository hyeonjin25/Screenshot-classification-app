import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Appbar} from 'react-native-paper';

const BackBar = () => {
  const navigation = useNavigation();
  return (
    <>
      <Appbar.BackAction
        onPress={() => {
          navigation.pop();
        }}
      />
    </>
  );
};

export default BackBar;
