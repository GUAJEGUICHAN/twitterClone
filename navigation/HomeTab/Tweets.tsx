import React from "react";

import { Text, Dimensions } from "react-native";
import styled from "styled-components/native";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import Upload from "./components/Upload";

const Container = styled.View`
  position: relative;
  height: ${SCREEN_HEIGHT}px;
`;
export default function Tweets() {
  return (
    <Container>
      <Text>Tweets</Text>
      <Upload />
    </Container>
  );
}
