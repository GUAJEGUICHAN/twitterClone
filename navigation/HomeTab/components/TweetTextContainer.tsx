import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  background-color:#E2E8EC;
  border-radius:10px;
  padding:10px;
`;

const TweetHeader = styled.View`
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  border: 1px #E2E8EC ;
`;

const Username = styled.Text`
  font-size:16px;
  font-weight:600;
`;

const Date = styled.Text`
  font-size:16px;
  /* font-weight:600; */
`;

const TweetContentContainer = styled.View`
  margin-top:10px;
`;

const TweetContent = styled.Text`
  font-size:16px;
`;

interface TweetTextContainerProps {
  username: string,
  date: string,
  contentText: string
}

export default function TweetTextContainer({
  username, date, contentText,
}: TweetTextContainerProps): React.ReactElement {
  return (
    <Container>
      <TweetHeader>
        <Username>
          {username}
        </Username>
        <Date>
          {date}
        </Date>
      </TweetHeader>
      <TweetContentContainer>
        <TweetContent>{contentText}</TweetContent>
      </TweetContentContainer>
    </Container>
  );
}
