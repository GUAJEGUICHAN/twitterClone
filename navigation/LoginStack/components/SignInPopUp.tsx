import React, { useCallback, useEffect, useState } from 'react';

import { Dimensions, TouchableOpacity } from 'react-native';

import { CommonActions } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';
import { useQuery, useQueryClient } from 'react-query';
import { postLogin } from '../../../service/api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  position:absolute;
  display:flex;
  align-items:center;
  align-self: center;
  width: 300px;
  height: 250px;
  background-color:white;
  border-color: black;
  top:${SCREEN_HEIGHT * 0.3}px;
  z-index: 1;
  border: 1px white;
  border-bottom-color: gray;
  border-right-color: gray;
`;

const CloseButtonContainer = styled.View`
  width:${'100%'};
  padding-top:10px;
  padding-left:10px;
  z-index:1;
`;

const CloseIcon = styled.Text`
  font-size:30px;
`;

const LoginButton = styled.TouchableOpacity`
  /* margin-top:-20px;   */
  width:60px;  
  background-color:#C4C4C4;
  padding:10px;
  /* align-self:flex-end; */
  /* margin-right:20px; */

  border-radius: 15px;
`;

const LoginText = styled.Text`
  align-self:center;
`;

const LogInTitle = styled.Text`
  position:absolute;
  margin-top:20px;
  font-size:30px;
  font-weight:600;
  align-self:center;
`;

const InputContainer = styled.View`
  width:${'100%'};
  margin-top:-25px;
  padding:30px;
`;

const TextInputForSignIn = styled.TextInput`
  border: 1px  white;
  border-bottom-color:  #1D9BF0;
  /* border-bottom-color: {err ? 'red' : '#1D9BF0'}; */
  height: 40px;
  margin: 12px;
  border-width: 1px;
  padding: 10px;
`;

const Footer = styled.View`
  width:${'80%'};
  margin-top:-20px;  
  /* background-color:gray; */
  display:flex;
  flex-direction:row;
  justify-content:space-between;
`;
const ErrorMessage = styled.Text`
  color:red;
`;

export default function SignInPopUp({ navigation, closeButton }: any): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: ACCESS_TOKEN,
    refetch: getToken,
  } = useQuery<any>(
    'ACCESS_TOKEN',
    () => postLogin({ email, password }),
    {
      enabled: false,
    },
  );
  console.log('ACCESS_TOKEN', ACCESS_TOKEN);
  useEffect(() => {
    if (ACCESS_TOKEN === undefined) {
      return;
    } if (ACCESS_TOKEN.message !== undefined) {
      setErr(true);
      queryClient.setQueryData('ACCESS_TOKEN', undefined);
      setEmail('');
      setPassword('');
      return;
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      }),
    );
  });

  const handleChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  return (
    <Container>
      <CloseButtonContainer>
        <TouchableOpacity onPress={() => { closeButton(false); }}>
          <CloseIcon>
            <Ionicons
              color="#788ea4"
              size={30}
              name="close"
            />
          </CloseIcon>
        </TouchableOpacity>
      </CloseButtonContainer>
      <LogInTitle>
        로그인
      </LogInTitle>
      <InputContainer>
        <TextInputForSignIn
          textContentType="emailAddress"
          autoFocus
          autoCapitalize="none"
          placeholder="이메일"
          onChangeText={handleChangeEmail}
          value={email}
          style={{
            borderColor: err ? 'red' : 'white',
            borderBottomColor: err ? 'red' : '#1D9BF0',
          }}
        />
        <TextInputForSignIn
          textContentType="password"
          autoCapitalize="none"
          placeholder="비밀번호"
          secureTextEntry
          onChangeText={handleChangePassword}
          value={password}
          style={{
            borderColor: err ? 'red' : 'white',
            borderBottomColor: err ? 'red' : '#1D9BF0',
          }}
          onSubmitEditing={() => { getToken(); }}
        />
      </InputContainer>
      <Footer>
        <ErrorMessage>
          {err ? '값이 올바르지 않습니다.' : false}
        </ErrorMessage>
        <LoginButton onPress={() => {
          getToken();
        }}
        >
          <LoginText>
            로그인
          </LoginText>
        </LoginButton>
      </Footer>
    </Container>
  );
}
