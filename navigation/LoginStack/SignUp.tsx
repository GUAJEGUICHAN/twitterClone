import React from 'react';

import { Text } from 'react-native';

import styled from 'styled-components/native';

import { TextInput } from 'react-native-paper';

import PropTypes from 'prop-types';

const BlueButton = styled.TouchableOpacity`
  background-color:#1D9BF0;
  margin:8px 0 ;
  width:300px;
  height:50px;
  font-size:100px;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius: 30px;
`;

const TitleContainer = styled.View`
  font-size:20px;
`;
const Title = styled.Text`
  font-size:50px;
  font-weight:900;
  margin-top:200px;
`;

const Container = styled.View`
  display:flex;
  flex-direction:column;
align-items:center;
/* align-content:center; */
`;

const TextInputContainer = styled.View`
  width:${'100%'};
  padding:40px;
`;

export default function SignUp({ navigation }) {
  return (
    <Container>
      <TitleContainer>
        <Title>회원가입</Title>
      </TitleContainer>
      <TextInputContainer>
        <TextInput
          mode="outlined"
          textContentType="emailAddress"
          label="Email"
          activeOutlineColor="#1D9BF0"
          activeUnderlineColor="#1D9BF0"
          outlineColor="#1D9BF0"
          style={{
            marginBottom: 8,
          }}
        />
        <TextInput
          mode="outlined"
          textContentType="name"
          secureTextEntry
          label="Username"
          activeOutlineColor="#1D9BF0"
          activeUnderlineColor="#1D9BF0"
          outlineColor="#1D9BF0"
          style={{
            marginBottom: 8,
          }}
        />
        <TextInput
          mode="outlined"
          textContentType="password"
          secureTextEntry
          label="Password"
          activeOutlineColor="#1D9BF0"
          activeUnderlineColor="#1D9BF0"
          outlineColor="#1D9BF0"
        />
      </TextInputContainer>
      <BlueButton
        // onPress={() => navigation.navigate('')}
        onPress={() => navigation.goBack()}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          회원가입
        </Text>
      </BlueButton>
    </Container>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
