import React, { useState } from 'react';

import { Text } from 'react-native';

import styled from 'styled-components/native';

import PropTypes from 'prop-types';

import SignInPopUp from './components/SignInPopUp';
import TouchableBlurView from './components/TouchableBlurView';

const Container = styled.View`
  width: ${'100%'};
  height: ${'100%'};
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
`;

const MainImage = styled.Image`
  margin-top: 180px;
  margin-bottom: 80px;
  width: 250px;
  height: 250px;
  aspect-ratio: 1.5;
`;

const BlueButton = styled.TouchableOpacity`
  background-color: #1d9bf0;
  margin: 8px 0;
  width: 300px;
  height: 50px;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
export default function Main({ navigation }) {
  const [isPopup, setPopUp] = useState(false);

  return (
    <Container>
      <MainImage
        style={{
          transform: [{ rotate: '-30deg' }],
        }}
        resizeMode="contain"
        source={require('../../asset/twitterLogo.png')}
      />
      <ButtonContainer>
        <BlueButton
          onPress={() => {
            setPopUp(true);
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            로그인
          </Text>
        </BlueButton>
        <BlueButton onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            회원가입
          </Text>
        </BlueButton>
      </ButtonContainer>
      {isPopup ? (
        <TouchableBlurView setPopUp={setPopUp}>
          <SignInPopUp navigation={navigation} closeButton={setPopUp} />
        </TouchableBlurView>
      ) : (
        false
      )}
    </Container>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
