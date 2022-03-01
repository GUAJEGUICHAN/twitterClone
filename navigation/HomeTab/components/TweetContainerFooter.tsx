import React from 'react';

import { useQueryClient } from 'react-query';

import { Feather, Ionicons } from '@expo/vector-icons';

import { Pressable } from 'react-native';

import styled from 'styled-components/native';

import { deletePost, updatePost } from '../../../service/api';

const Container = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  margin-top:10px;
`;

interface ImagePostProps {
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

interface TweetContainerFooterProps {
  idx: Number,
  isEditMode: Boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  newContent: String,
  accessToken: String,
  currentImages: Array<ImagePostProps>,
}

export default function TweetContainerFooter({
  idx, isEditMode, setEditMode, newContent, accessToken, currentImages,
}: TweetContainerFooterProps): React.ReactElement {
  const queryClient = useQueryClient();

  return (
    <Container>
      <Pressable onPress={async () => {
        if (isEditMode === true) {
          // 수정내용 전달, 업데이트
          await updatePost({
            idx, accessToken, content: newContent, images: currentImages,
          });
          queryClient.refetchQueries(['allPosts']);
        } else {
          // 그냥 아무것도 안함
        }
        setEditMode(!isEditMode);
      }}
      >
        {isEditMode
          ? (<Ionicons name="save-outline" size={20} />)
          : (<Feather name="edit-2" size={20} />)}

      </Pressable>
      <Pressable onPress={async () => {
        await deletePost({ idx, accessToken });
        queryClient.refetchQueries(['allPosts']);
      }}
      >
        <Ionicons name="trash-outline" size={20} />
      </Pressable>
    </Container>
  );
}
