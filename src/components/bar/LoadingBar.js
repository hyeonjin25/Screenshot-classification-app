import React from 'react';
import {Button} from '@rneui/base';
import styled from 'styled-components';
import {AppColor} from '../../utils/GlobalStyles';

const LoadingBar = () => {
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
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default LoadingBar;
