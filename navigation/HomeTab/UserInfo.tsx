import React from 'react';

import { Text, Dimensions } from 'react-native';

import { CommonActions } from '@react-navigation/native';

import styled from 'styled-components/native';

import PropTypes from 'prop-types';

import Upload from './components/Upload';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  position: relative;
  height: ${SCREEN_HEIGHT}px;
`;

const BackGround = styled.View`
  height: 180px;
  background-color: #e2e8ec;
  position: relative;
  margin-bottom: 60px;
`;

const Image = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  border-width: 4px;
  border-color: white;
  top: 115px;
  left: 20px;
`;
const BlueButton = styled.TouchableOpacity`
  background-color: #1d9bf0;
  margin-top: 20px;
  width: 200px;
  height: 50px;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  align-self: center;
`;

const Info = styled.View`
  padding: 20px 25px;
  border-bottom-width: 3px;
  border-bottom-color: #e2e8ec;
`;

const Name = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: black;
`;

export default function UserInfo({ navigation }) {
  return (
    <Container>
      <BackGround>
        <Image
          source={{
            uri: 'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/hm/2020/12/11/202012111655103390984_20201211165529_01.jpg',
          }}
        />
      </BackGround>
      <Info>
        <Name>조유리</Name>
      </Info>

      <BlueButton
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          );
        }}
      >
        <Text>로그아웃</Text>
      </BlueButton>
      <Upload />
    </Container>
  );
}

UserInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
  }).isRequired,
};
