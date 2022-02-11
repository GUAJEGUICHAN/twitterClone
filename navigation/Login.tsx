import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native'
import Main from './LoginStack/Main'
import SignUp from './LoginStack/SignUp';

const Stack = createNativeStackNavigator()

export default function Login() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',

      }}
    >
      <Stack.Screen
        name='Main'
        component={Main}

      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerTitle: '',
          headerBackButtonMenuEnabled: true
          // headerLeft: () => <Text>뒤로가기</Text>
        }}
      />
    </Stack.Navigator>
    // <View>
    //   <Text>Login Page</Text>
    // </View>
  );
}
