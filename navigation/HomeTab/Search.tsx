import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Upload from './components/Upload';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  position: relative;
  height: ${SCREEN_HEIGHT}px;
`;
const SearchBar = styled.TextInput`
  background-color: #f0f3f4;
  padding: 15px 15px;
  border-radius: 15px;
  width: 90%;
  font-size: 20px;

  margin: 20px auto;
  margin-bottom: 40px;
`;

export default function Search() {
  return (
    <Container>
      <SearchBar placeholder="Search Twitter" />
      <Upload />
    </Container>
  );
}
