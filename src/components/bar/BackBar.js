import {useNavigation} from '@react-navigation/native';
import {Header} from '@rneui/themed';
import {Icon} from '@rneui/themed/dist';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppColor} from '../../utils/GlobalStyles';

const BackBar = ({rightOnPress, rightIcon, title}) => {
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
        rightComponent={
          <TouchableOpacity style={{marginRight: 10}} onPress={rightOnPress}>
            {rightIcon}
          </TouchableOpacity>
        }
        backgroundColor={AppColor.white}
        centerComponent={{text: title, style: {fontSize: 20}}}
      />
    </>
  );
};

export default BackBar;
