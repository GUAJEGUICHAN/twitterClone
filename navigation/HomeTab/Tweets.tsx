import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Tweets() {
  // const navigation = useNavigation()
  // useEffect(() => {
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [
  //         { name: 'Tweets' },
  //       ],
  //     })
  //   );
  // })
  return (
    <View>
      <Text>
        Tweets
      </Text>
    </View>
  );
}
