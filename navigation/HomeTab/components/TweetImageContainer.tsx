import { BASE_URL } from '@env';
import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  margin:10px 0;
`;

type ImagePostProps = {
  idx: number,
  name: string,
  originalName: string,
  saveName: string,
  size: number,
  uploadPath: string,
  extension: string,
  url: string,
  createdAt: string
}

interface TweetImageContainerProps {
  contentImageList: Array<ImagePostProps>
}

export default function TweetImageContainer({ contentImageList }: TweetImageContainerProps)
  : React.ReactElement {
  return (
    <Container>
      {
        contentImageList.map((image: ImagePostProps) => (
          <Image
            key={image.idx}
            style={{
              borderWidth: 2,
              borderRadius: 10,
              borderColor: 'lightgray',
              backgroundColor: 'lightgray',
              width: '100%',
              height: 200,
            }}
            source={{
              uri: `${BASE_URL}${image.url}`,
            }}
          />
        ))
      }
    </Container>
  );
}
