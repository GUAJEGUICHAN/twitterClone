import React from 'react';
import { Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

import Main from './PopupStack/Main';
import Detail from './PopupStack/Detail';
import View from './PopupStack/View';

const NativeStack = createNativeStackNavigator();

const Btn = styled.TouchableOpacity``;

function Upload() {
  const navigation = useNavigation();

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        title: '',
        headerLeft: () => (
          <Btn
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>
              <Ionicons size={30} color="#6BAAE8" name="arrow-back-outline" />
            </Text>
          </Btn>
        ),
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <NativeStack.Screen name="Main" component={Main} />
      <NativeStack.Screen name="Detail" component={Detail} />
      <NativeStack.Screen name="View" component={View} />
    </NativeStack.Navigator>
  );
}

export default Upload;
