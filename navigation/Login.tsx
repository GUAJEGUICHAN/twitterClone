import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './LoginStack/Main';
import SignUp from './LoginStack/SignUp';

const Stack = createNativeStackNavigator();

export default function Login() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',

      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}

      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
