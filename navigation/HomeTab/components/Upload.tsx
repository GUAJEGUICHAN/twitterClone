
import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PopupBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: #6baae8;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
`;

function Upload() {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 200,
        right: 20,
        alignSelf: 'flex-end',
        zIndex: 5,
      }}
    >
      <PopupBtn
        onPress={() => {
          navigation.navigate("Upload", { screen: "Main" });
        }}
      >
        <Text>
          <Ionicons size={30} color="black" name="paper-plane" />
        </Text>
      </PopupBtn>
    </View>
  );
}

export default Upload;
