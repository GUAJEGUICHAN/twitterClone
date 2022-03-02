import React, { useState } from 'react';

import { Text, TextInput, View } from 'react-native';

import styled from 'styled-components/native';

import { useQueryClient } from 'react-query';

import { deleteComment, updateComment } from '../../../service/api';

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
  tweetIdx: Number
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

const Remove = styled.Pressable`  
`;

const Edit = styled.Pressable`
`;

const HeaderRight = styled.View`
display:flex;
flex-direction:row;
`;

export default function TweetComment(
  { commentData, accessToken, tweetIdx }: TweetCommentProps,
)
  : React.FunctionComponentElement<View> {
  const {
    member: { username }, createdAt, idx, content,
  } = commentData;

  const [isEditMode, setEditMode] = useState(false);
  const [newComment, setNewComment] = useState(content);
  const queryClient = useQueryClient();

  const handleContentChange = (text: string) => {
    setNewComment(text);
    console.log(text);
  };

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
            <HeaderRight>
              <Date>
                {createdAt.split('T')[0]}
              </Date>
              <Remove
                onPress={async () => {
                  await deleteComment({ commentIdx: idx, accessToken });
                  queryClient.refetchQueries([`comments${tweetIdx}`]);
                }}
              >
                <Text>❌</Text>
              </Remove>
              <Edit
                onPress={async () => {
                  if (isEditMode) {
                    await updateComment({ commentIdx: idx, content: newComment, accessToken });
                    queryClient.refetchQueries([`comments${tweetIdx}`]);
                  }
                  setEditMode((prev) => !prev);
                }}
              >
                {isEditMode
                  ? <Text>📀</Text>
                  : <Text>✏️</Text>}
              </Edit>
            </HeaderRight>
          </CommentInfo>
          {isEditMode
            ? (
              <TextInput
                style={{
                  backgroundColor: 'white',
                }}
                value={String(newComment)}
                onChangeText={handleContentChange}
              />
            )
            : <Text>{content}</Text>}
        </View>
      </ContentContainer>
    </Container>
  );
}
