import React from 'react';
import {Button} from '@rneui/base';
import {AppColor} from '../../utils/GlobalStyles';
import {Container, Message} from './LoadingBar';
import {Icon} from '@rneui/themed';

const ReloadBar = ({title, onPress}) => {
  return (
    <Container>
      <Icon
        onPress={onPress}
        name="reload1"
        type="antdesign"
        color={AppColor.secondary}
        containerStyle={{marginBottom: 10}}
      />
      <Message>{title}</Message>
    </Container>
  );
};

export default ReloadBar;
