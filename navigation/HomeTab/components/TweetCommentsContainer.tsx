import React, { useState } from 'react';

import styled from 'styled-components/native';
import { useInfiniteQuery } from 'react-query';
import { getGetCommentsByPost } from '../../../service/api';

import CommentHeader from './CommentHeader';
import TweetComments from './TweetComments';
import CommentTextInput from './CommentTextInput';

const CommentContainer = styled.View`
`;

const CommentBody = styled.View`  
`;

interface TweetCommentsContainerProps {
  idx: Number,
  accessToken: String
}

export default function TweetCommentsContainer({ idx, accessToken }: TweetCommentsContainerProps)
  : React.ReactElement {
  const [commentToggle, setCommentToggle] = useState(false);

  const {
    data: commentsData,
    isLoading,
    refetch: getComments,
    isRefetching: isRefetchingComments,
    // hasNextPage: hasCommentsNextPage,
    // fetchNextPage: fetchCommentsNextPage,
  } = useInfiniteQuery<any>(
    [`comments${idx}`],
    () => getGetCommentsByPost({ idx }),
    {
      enabled: false,
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.current_page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    },
  );

  return (
    <CommentContainer>
      <CommentHeader idx={idx} commentToggle={commentToggle} setCommentToggle={setCommentToggle} />
      {commentToggle ? (
        <CommentBody>
          <CommentTextInput
            idx={idx}
            getComments={getComments}
            accessToken={accessToken}
          />
          <TweetComments
            isLoading={isLoading}
            isRefetchingComments={isRefetchingComments}
            commentsData={commentsData}
            accessToken={accessToken}
            tweetIdx={idx}
          />
        </CommentBody>
      )
        : false}
    </CommentContainer>
  );
}
