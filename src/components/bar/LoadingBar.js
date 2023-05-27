import React from 'react';
import {Button} from '@rneui/base';
import styled from 'styled-components';
import {AppColor} from '../../utils/GlobalStyles';

const LoadingBar = ({title}) => {
  return (
    <Container>
      <Button
        loading
        color="primary"
        loadingProps={{
          color: AppColor.secondary,
        }}
        buttonStyle={{backgroundColor: AppColor.white}}
      />
      <Message>{title}</Message>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${AppColor.white};
`;

const Message = styled.Text`
  font-size: 20px;
  color: ${AppColor.secondary};
`;

export default LoadingBar;
