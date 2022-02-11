import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

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
align-self:center;
`

export default function UserInfo({ navigation }) {
  return (
    <View>
      <BlueButton
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Login' },
              ],
            })
          );
        }}>
        <Text>
          로그아웃
        </Text>
      </BlueButton>
    </View>
  );
}
