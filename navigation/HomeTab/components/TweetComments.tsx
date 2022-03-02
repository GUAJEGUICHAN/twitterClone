import React from 'react';

import styled from 'styled-components/native';

import { FlatList } from 'react-native';

import { InfiniteData } from 'react-query';

import TweetComment from './TweetComment';
import { SmallLoader } from '../../components/Loader';

const Container = styled.View`
  height:400px;
`;

interface TweetCommentsProps {
  isLoading: Boolean,
  isRefetchingComments: Boolean,
  commentsData: InfiniteData<any>,
  accessToken: String,
  tweetIdx: Number
}

export default function TweetComments({
  isLoading,
  isRefetchingComments,
  commentsData,
  accessToken,
  tweetIdx,
}: TweetCommentsProps): React.ReactElement {
  const renderItem = ({ item: commentData }) => (
    <TweetComment
      key={commentData.idx}
      commentData={commentData}
      accessToken={accessToken}
      tweetIdx={tweetIdx}
    />
  );

  return (
    <Container>
      {isLoading || isRefetchingComments || commentsData === undefined
        ? (<SmallLoader />)
        : (
          <FlatList
            data={commentsData.pages.map((page) => page.comments).flat()}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.idx}`}
            showsVerticalScrollIndicator={false}
          />
        )}
    </Container>
  );
}
