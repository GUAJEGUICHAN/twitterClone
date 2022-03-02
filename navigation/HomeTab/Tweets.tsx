import React from 'react';

import { Dimensions, FlatList } from 'react-native';

import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';

import styled from 'styled-components/native';

import { fetchAllPosts, getMyInfo } from '../../service/api';

import Tweet from './components/Tweet';
import Upload from './components/Upload';
import { LargeLoader } from '../components/Loader';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  display: flex;
  flex-direction: column;
  position: relative;
  height: ${SCREEN_HEIGHT}px;
  background-color: white;
`;

type ImagePostProps = {
  idx: number;
  name: string;
  originalName: string;
  saveName: string;
  size: number;
  uploadPath: string;
  extension: string;
  url: string;
  createdAt: string;
};

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

export default function Tweets() {
  const {
    data: tweetData,
    isLoading,
    isRefetching: isRefetchingAllPosts,
    hasNextPage: hasTweetsNextPage,
    fetchNextPage: fetchTweetsNextPage,
  }: any = useInfiniteQuery<any>(['allPosts', ''], fetchAllPosts, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.current_page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const queryClient = useQueryClient();
  const ACCESS_TOKEN = queryClient.getQueryData('ACCESS_TOKEN');
  useQuery<any>(
    ['myInfo', ACCESS_TOKEN],
    getMyInfo,
  );

  const onRefresh = () => {
    queryClient.refetchQueries(['allPosts']);
  };

  const refreshing = isRefetchingAllPosts;

  const renderItem = ({ item }: { item: Item }) => (
    <Tweet
      key={item.idx}
      idx={item.idx}
      item={item}
    />
  );

  const loadMore = () => {
    if (hasTweetsNextPage) {
      fetchTweetsNextPage();
    }
  };

  return (
    <Container
      style={{
        backgroundColor: 'gray',

      }}
    >
      {isLoading ? (
        <LargeLoader />
      ) : (
        <FlatList
          style={{
            flex: 1,

          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={tweetData.pages.map((page) => page.posts).flat()}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.idx}`}
          onEndReached={loadMore}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Upload />
    </Container>
  );
}
