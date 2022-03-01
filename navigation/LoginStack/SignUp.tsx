import React, { useCallback, useEffect, useState } from 'react';

import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import styled from 'styled-components/native';

import PropTypes from 'prop-types';

import { useQuery, useQueryClient } from 'react-query';

import { postSignup } from '../../service/api';

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

const MessageContainer = styled.View`
  margin-top: -20px;
  margin-bottom: 10px;

`;

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMeesage] = useState('');

  const queryclient = useQueryClient();

  const {
    data,
    refetch: getToken,
  } = useQuery<any>('SignUp', () => (postSignup({ email, username, password })), {
    enabled: false,
  });

  useEffect(() => {
    console.log('useEffect', data);
    if (data === undefined) {
      console.log('회원가입 안됨');
      return;
    } if (data.message !== undefined) {
      console.log('회원가입 실패', data.message);
      setErrorMeesage(data.message);
      return;
    }

    console.log('회원가입 완료');
    setEmail('');
    setUsername('');
    setPassword('');
    queryclient.setQueryData('SignUp', undefined);

    navigation.goBack();
  });

  const handleChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handleChangeUsername = useCallback((text: string) => {
    setUsername(text);
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

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
          autoCapitalize="none"
          activeOutlineColor="#1D9BF0"
          activeUnderlineColor="#1D9BF0"
          outlineColor="#1D9BF0"
          onChangeText={handleChangeEmail}
          style={{
            marginBottom: 8,
          }}
        />
        <TextInput
          mode="outlined"
          textContentType="username"
          label="Username"
          autoCapitalize="none"
          activeOutlineColor="#1D9BF0"
          activeUnderlineColor="#1D9BF0"
          outlineColor="#1D9BF0"
          onChangeText={handleChangeUsername}
          style={{
            marginBottom: 8,
          }}
        />
        <TextInput
          mode="outlined"
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          label="Password"
          activeOutlineColor="#1D9BF0"
          activeUnderlineColor="#1D9BF0"
          outlineColor="#1D9BF0"
          onChangeText={handleChangePassword}
        />
      </TextInputContainer>
      <MessageContainer>
        <Text
          style={{
            color: 'red',
          }}
        >
          {errorMessage}
        </Text>
      </MessageContainer>
      <BlueButton
        onPress={() => {
          getToken();
        }}
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
