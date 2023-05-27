import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {LoadingState} from './state/RecoilState';
import {AppColor} from './utils/GlobalStyles';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const loadingState = useRecoilValue(LoadingState);
  const [textNum, setTextNum] = useState(1);

  const texts = [
    '이미지 태깅 중입니다',
    '이미지 태깅 중입니다.',
    '이미지 태깅 중입니다..',
    '이미지 태깅 중입니다...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextNum((textNum + 1) % 4);
      if (!loadingState)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <Container>
      <Message>{texts[textNum]}</Message>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Message = styled.Text`
  font-size: 20px;
  color: ${AppColor.secondary};
`;

export default WelcomeScreen;
