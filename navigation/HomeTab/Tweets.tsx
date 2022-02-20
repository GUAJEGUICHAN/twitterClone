import React from 'react';

import { View } from 'react-native';

import styled from 'styled-components/native';

import Tweet from './components/Tweet';

const Container = styled.ScrollView`
  display:flex;
  flex-direction: column;
  flex:1;
  background-color:white;
`;

export default function Tweets() {
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
  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
        }}
      >
        <Tweet
          profileImage=""
          username="오바마"
          date="2022/01/01"
          contentText="새해복 많이 받으세요"
          comments={TweetComments}
          contentImage="/asdf"
        />
        <Tweet
          profileImage=""
          username="트럼프"
          date="2022/01/01"
          contentText="우리 모두 새해복 많이 받아요~"
          comments={TweetComments}
          contentImage="/asdf"
        />
        <Tweet
          profileImage=""
          username="오바마"
          date="2022/01/01"
          contentText="땡큐 땡큐"
          comments={TweetComments}
          contentImage="/asdf"
        />
        <Tweet
          profileImage=""
          username="트럼프"
          date="2022/01/01"
          contentText="요즘 뭐함? "
          comments={TweetComments}
          contentImage="/asdf"
        />
        <Tweet
          profileImage=""
          username="오바마"
          date="2022/01/01"
          contentText="요즘 좀 쉬는 중 ㅎㅎ"
          comments={TweetComments}
          contentImage="/asdf"
        />
      </View>
    </Container>
  );
}
