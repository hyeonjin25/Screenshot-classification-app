import {useNavigation} from '@react-navigation/native';
import {Header} from '@rneui/themed';
import {Icon} from '@rneui/themed/dist';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppColor} from '../../utils/GlobalStyles';

const BackBar = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              navigation.pop();
              console.log('뒤로');
            }}>
            <Icon type="ionicon" name="chevron-back" />
          </TouchableOpacity>
        }
        backgroundColor={AppColor.white}
      />
    </>
  );
};

export default BackBar;
