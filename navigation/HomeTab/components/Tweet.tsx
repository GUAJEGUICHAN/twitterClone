import React, { useState } from 'react';

import styled from 'styled-components/native';

import { useQueryClient } from 'react-query';

import { useNavigation } from '@react-navigation/native';

import TweetImageContainer from './TweetImageContainer';
import ProfileImageContainer from './ProfileImageContainer';
import TweetContainerFooter from './TweetContainerFooter';
import TweetContentBox from './TweetContentBox';

const ComponentContainer = styled.View`
`;

const ContentContainer = styled.View`
  flex:9;
`;

const TweetContainer = styled.View`
`;

const GoDetail = styled.TouchableOpacity`

  flex-direction:row;
  background-color:white;
  width:${'100%'};
  padding:20px;
  border: 1px white;
  border-bottom-color:#E2E8EC;`;

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
interface Item {
  idx: number,
  title: string,
  content: string,
  member: { username: string, image: { url: string } },
  createdAt: string,
  deletedAt: string,
  updatedAt: string,
  postImages: Array<ImagePostProps>
}
interface TweetProps {
  idx: number,
  item: Item
}

export default function Tweet({ idx, item }: TweetProps) {
  const { member, postImages, content } = item;

  const [isEditMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const ACCESS_TOKEN: String = queryClient.getQueryData('ACCESS_TOKEN');

  console.log(item);

  return (
    <ComponentContainer>
      <GoDetail
        onPress={() => {
          navigation.navigate('Popup', {
            screen: 'Detail',
            params: {
              ...item,
            },
          });
        }}
      >
        <ProfileImageContainer
          url={member.image === null ? '' : member.image.url}
        />
        <ContentContainer>
          <TweetContainer>
            <TweetContentBox
              isEditMode={isEditMode}
              setNewContent={setNewContent}
              newContent={newContent}
              item={item}
            />
            <TweetContainerFooter
              idx={idx}
              isEditMode={isEditMode}
              setEditMode={setEditMode}
              newContent={newContent}
              accessToken={ACCESS_TOKEN}
              currentImages={postImages}
            />
            <TweetImageContainer
              contentImageList={postImages}
            />
          </TweetContainer>
          {/* <TweetCommentsContainer
          idx={idx}
          accessToken={ACCESS_TOKEN}
        /> */}
        </ContentContainer>
      </GoDetail>
    </ComponentContainer>
  );
}
