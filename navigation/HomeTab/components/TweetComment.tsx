import React from 'react';

import { Text, View } from 'react-native';
import { useQueryClient } from 'react-query';

import styled from 'styled-components/native';
import { deleteComment } from '../../../service/api';

type TweetCommentProps = {
  commentData: {
    idx: Number,
    content: String,
    createdAt: String,
    updatedAt: Number,
    deletedAt: null,
    member: {
      idx: Number,
      email: String,
      password: String,
      username: String,
      image: String,
      auth: String,
      createdAt: String
    },
  }
  accessToken: String,
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  background-color: lightgray;
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
`;

const ProfileImageContainer = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex:7;
`;

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

const Close = styled.Pressable`  
`;

export default function TweetComment(
  { commentData, accessToken }: TweetCommentProps,
)
  : React.FunctionComponentElement<View> {
  const {
    member: { username }, createdAt, idx, content,
  } = commentData;

  const queryClient = useQueryClient();

  return (
    <Container>
      <ProfileImageContainer>
        <ProfileImage
          style={{
            backgroundColor: 'black',
          }}
        />
      </ProfileImageContainer>
      <ContentContainer>
        <View>
          <CommentInfo>
            <View>
              <UserName>
                {username}
              </UserName>
            </View>
            <View>
              <Date>
                {createdAt}
              </Date>
              <Close
                onPress={async () => {
                  console.log('삭제!');
                  await deleteComment({ commentIdx: idx, accessToken }).then(() => {
                    queryClient.refetchQueries([`comments${idx}`]);
                  });
                }}
              >
                <Text>❌</Text>
              </Close>
            </View>
          </CommentInfo>
          <Text>{content}</Text>
        </View>
      </ContentContainer>
    </Container>
  );
}
