import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')


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
  border: 1px white solid;
  border-bottom-color: gray;
  border-right-color: gray;
`

const CloseButtonContainer = styled.View`
  width:${`100%`};
  padding-top:10px;
  padding-left:10px;
  z-index:1;
`
const CloseIcon = styled.Text`
  font-size:30px;
`
const LoginButton = styled.TouchableOpacity`
  margin-top:-20px;  
  width:60px;  
  background-color:#C4C4C4;
  padding:10px;
  align-self:flex-end;
  margin-right:20px;
  border-radius: 15px;
`

const LoginText = styled.Text`
  align-self:center;
`

const LogInTitle = styled.Text`
  position:absolute;
  margin-top:20px;
  font-size:30px;
  font-weight:600;
  align-self:center;
`

const InputContainer = styled.View`
  width:${`100%`};
  margin-top:-25px;
  padding:30px;
`

const TextInputForSignIn = styled.TextInput`
  border: 1px solid white;
  border-bottom-color: #1D9BF0;
  height: 40px;
  margin: 12px;
  border-width: 1px;
  padding: 10px;
`

export default function SignInPopUp({ navigation, closeButton }) {

  return (
    <Container>
      <CloseButtonContainer >
        <TouchableOpacity onPress={() => { closeButton(false) }} >
          <CloseIcon>
            <Ionicons
              color='#788ea4'
              size={30}
              name='close'
            />
          </CloseIcon>
        </TouchableOpacity>
      </CloseButtonContainer>
      <LogInTitle>
        로그인
      </LogInTitle>
      <InputContainer>
        <TextInputForSignIn
          textContentType='emailAddress'
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="이메일"
        // keyboardType="numeric"
        >

        </TextInputForSignIn>
        <TextInputForSignIn
          textContentType='password'
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="비밀번호"
        // keyboardType="numeric"
        ></TextInputForSignIn>
      </InputContainer>
      <LoginButton onPress={() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' },
            ],
          })
        );
      }}  >
        <LoginText>
          로그인
        </LoginText>
      </LoginButton>
    </Container>
  );
}
