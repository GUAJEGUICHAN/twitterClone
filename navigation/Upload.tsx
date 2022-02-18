import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./UploadStack/Main";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NativeStack = createNativeStackNavigator();

const Btn = styled.TouchableOpacity``;

const Upload = () => {
  const navigation = useNavigation();

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        title: "",
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
          backgroundColor: "white",
        },
      }}
    >
      <NativeStack.Screen name="Main" component={Main} />
    </NativeStack.Navigator>
  );
};

export default Upload;
