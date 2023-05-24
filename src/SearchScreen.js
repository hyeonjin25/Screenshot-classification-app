import React from 'react';
import {BackBar} from './components/bar/BasicHeaderBar';
import {SearchBar} from './components/bar/SearchBar';
import {ImageList} from './components/List/ImageList';
import {Container} from './HomeScreen';
import styled from 'styled-components';
import {AppColor} from './utils/GlobalStyles';

const SearchScreen = () => {
  return (
    <>
      <Header>
        <BackBar />
        <SearchBox>
          <SearchBar containerColor={AppColor.white} />
        </SearchBox>
      </Header>
      <ImageList />
    </>
  );
};

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SearchBox = styled.View`
  width: 90%;
  padding-right: 5%;
`;

export default SearchScreen;
