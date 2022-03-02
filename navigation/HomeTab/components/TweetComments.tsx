import React from 'react';

import styled from 'styled-components/native';

import { InfiniteData } from 'react-query';

import TweetComment from './TweetComment';

import { SmallLoader } from '../../components/Loader';

const Container = styled.View`
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
  return (
    <Container>
      {isLoading || isRefetchingComments || commentsData === undefined
        ? (<SmallLoader />)
        : commentsData.pages.map((page) => page.comments).flat().map((commentData) => (
          <TweetComment
            key={commentData.idx}
            commentData={commentData}
            accessToken={accessToken}
            tweetIdx={tweetIdx}
          />
        ))}
    </Container>
  );
}
