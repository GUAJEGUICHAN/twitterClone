import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
export function SmallLoader() {
  return (
    <Wrapper>
      <ActivityIndicator size="small" />
    </Wrapper>
  );
}

export function LargeLoader() {
  return (
    <Wrapper>
      <ActivityIndicator size="large" />
    </Wrapper>
  );
}
