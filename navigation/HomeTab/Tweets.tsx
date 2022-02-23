import React from 'react';

import { Text, Dimensions, FlatList } from 'react-native';

import { useQuery, useQueryClient } from 'react-query';

import styled from 'styled-components/native';
import { fetchAllPosts } from '../../service/api';

import Tweet from './components/Tweet';
import Upload from './components/Upload';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  display:flex;
  flex-direction: column;
  position:relative;
  height:${SCREEN_HEIGHT}px;
  background-color:white;
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

type PostProps = {
  idx: number,
  title: string,
  content: string,
  member: { username: string },
  createdAt: string,
  deletedAt: string,
  updatedAt: string,
  postImages: Array<ImagePostProps>
}

export default function Tweets() {
  const { data: tweetData, isLoading, isRefetching: isRefetchingAllPosts }: { data: any, isLoading: boolean, isRefetching: boolean } = useQuery<any>(['allPosts'], fetchAllPosts);

  const queryClient = useQueryClient();

  // const theData = queryClient.getQueryData('ACCESS_TOKEN')

  const TweetComments = [
    {
      id: 1,
      color: 'red',
      name: '트럼프',
      content: '안녕하세요 오바마',
    },
    {
      id: 2,
      color: 'blue',
      name: '오바마',
      content: '안녕하세요 트럼프',
    },
  ];

  const onRefresh = () => {
    queryClient.refetchQueries(['allPosts']);
  };
  const refreshing = isRefetchingAllPosts;

  const renderItem = ({ item }: { item: PostProps }) => (
    <Tweet
      key={item.idx}
      idx={item.idx}
      profileImage=""
      username={item.member.username}
      date={item.createdAt}
      contentText={item.content}
      comments={TweetComments}
      contentImageList={item.postImages}
    />
  );

  return (
    <Container
      style={{
        backgroundColor: 'gray',
      }}
    >
      {isLoading
        ? (<Text> 로딩중</Text>)
        : (
          <FlatList
            style={{
              flex: 1,
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={tweetData.posts}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.idx}`}
          />
        )}
      <Upload />
    </Container>
  );
}
