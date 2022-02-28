import React from 'react';

import styled from 'styled-components/native';

import { Text } from 'react-native';

import { InfiniteData } from 'react-query';

import TweetComment from './TweetComment';

const Container = styled.View`
`;

interface TweetCommentsProps {
  isLoading: Boolean,
  isRefetchingComments: Boolean,
  commentsData: InfiniteData<any>,
  accessToken: String
}

export default function TweetComments({
  isLoading,
  isRefetchingComments,
  commentsData,
  accessToken
}: TweetCommentsProps): React.ReactElement {
  return (
    <Container>
      {isLoading || isRefetchingComments || commentsData === undefined
        ? (<Text> 로딩중</Text>)
        : commentsData.pages.map((page) => page.comments).flat().map((commentData) => (
          <TweetComment
            key={commentData.idx}
            commentData={commentData}
            accessToken={accessToken}
          />
        ))}
    </Container>
  );
}
