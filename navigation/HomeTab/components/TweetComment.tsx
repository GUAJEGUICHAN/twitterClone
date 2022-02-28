import React from 'react';

import { Text, View } from 'react-native';
import styled from 'styled-components/native';

type TweetCommentProps = {
  color: string,
  name: string,
  content: string
}

const Container = styled.View``;

const ProfileImageContainer = styled.View``;

const ContentContainer = styled.View``;
const ProfileImage = styled.View`
          width: 25px;
          height: 25px;
          border-radius:25px;
`;

const UserName = styled.Text`
  font-weight:600;
`;

const Date = styled.Text``;

const CommentInfo = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  margin-bottom:5px;
`;

export default function TweetComment({ color, name, content }: TweetCommentProps)
  : React.FunctionComponentElement<View> {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        margin: 5,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <ProfileImageContainer
        style={{
          flex: 1,
        }}
      >
        <ProfileImage
          style={{
            backgroundColor: color,
          }}
        />
      </ProfileImageContainer>
      <ContentContainer
        style={{
          flex: 7,
        }}
      >
        <View>
          <CommentInfo>
            <UserName>
              {name}
            </UserName>
            <Date>
              시간날짜
            </Date>
          </CommentInfo>
          <Text>{content}</Text>
        </View>
      </ContentContainer>
    </Container>
  );
}
