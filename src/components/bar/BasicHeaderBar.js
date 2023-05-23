import {useNavigation} from '@react-navigation/native';
import {Header} from '@rneui/themed';
import {Icon} from '@rneui/themed/dist';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppColor} from '../../utils/GlobalStyles';

const BasicHeaderBar = ({rightOnPress, rightIcon, title, backgroundColor}) => {
  return (
    <>
      <Header
        leftComponent={<BackBar />}
        rightComponent={
          <TouchableOpacity style={{marginRight: 10}} onPress={rightOnPress}>
            {rightIcon}
          </TouchableOpacity>
        }
        backgroundColor={backgroundColor ? backgroundColor : AppColor.primary}
        centerComponent={{
          text: title,
          style: {color: 'black', fontSize: 20, fontWeight: 600},
        }}
        containerStyle={{paddingBottom: 15}}
      />
    </>
  );
};

export const BackBar = ({color}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <Icon
        style={{marginLeft: 10}}
        iconStyle={{color: color}}
        onPress={() => {
          navigation.pop();
        }}
        type="ionicon"
        name="chevron-back"
      />
    </TouchableOpacity>
  );
};

export default BasicHeaderBar;
