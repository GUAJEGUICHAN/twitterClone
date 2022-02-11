import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';

import Tweets from './HomeTab/Tweets';
import UserInfo from './HomeTab/UserInfo';
import Search from './HomeTab/Search';

const Tab = createBottomTabNavigator();

const Home = React.memo(() => (
  <Tab.Navigator
    initialRouteName="Tweets"
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
            color={focused ? '#6BAAE8' : '#788ea4'}
            name="person"
          />
        ),
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
            name="search"
          />
        ),
      }}
    />
  </Tab.Navigator>
));
export default Home;
