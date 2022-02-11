import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native'
import Tweets from './HomeTab/Tweets'
import UserInfo from './HomeTab/UserInfo'
import Search from './HomeTab/Search'
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import { title } from 'process';

const Tab = createBottomTabNavigator()

export default function Home() {



  return (
    <Tab.Navigator
      initialRouteName='Tweets'
      screenOptions={{
        tabBarActiveTintColor: '#f0edf6',
        tabBarInactiveTintColor: '#3e2465',
        tabBarStyle: { backgroundColor: '#E2E8EC' },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Tweets"
        component={Tweets}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              size={30}

              color={focused ? '#6BAAE8' : '#788ea4'}
              name="home"
            // name={focused ? 'film' : 'film-outline'}
            // name={focused ? 'film' : 'film'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={30}
              // size={size}
              color={focused ? '#6BAAE8' : '#788ea4'} name='person' />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              size={30}
              color={focused ? '#6BAAE8' : '#788ea4'}
              name='search'
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
