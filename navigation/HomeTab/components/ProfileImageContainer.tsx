import React from 'react';

import { BASE_URL } from '@env';

import styled from 'styled-components/native';

const Container = styled.View`
  flex:2;
`;

const ProfileImage = styled.Image`
  background-color:skyblue;
  width:50px;
  height:50px;
  border-radius: 50px;
`;

const BlankImage = styled.View`
  background-color:skyblue;
  width:50px;
  height:50px;
  border-radius: 50px;`;

interface ProfileImageContainerProps {
  url: string
}

export default function ProfileImageContainer({ url }
  : ProfileImageContainerProps) {
  console.log(`${BASE_URL}${url}`);
  return (
    <Container>
      {url
        ? (
          <ProfileImage
            source={{
              uri: `${BASE_URL}${url}`,
            }}
          />
        )
        : <BlankImage />}
    </Container>
  );
}
