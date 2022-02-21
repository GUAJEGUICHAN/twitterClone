import React from "react";

import { Text, View, Dimensions } from "react-native";
import styled from "styled-components/native";
// const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import Upload from "./components/Upload";

import { useQuery } from 'react-query';
import { fetchAllPosts } from '../../service/api';

import Tweet from './components/Tweet';

const Container = styled.ScrollView`
  display:flex;
  flex-direction: column;
  flex:1;
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
  createdAt: string,
  deletedAt: string,
  updatedAt: string,
  postImages: Array<ImagePostProps>
}

export default function Tweets() {
  const { data, isLoading }: { data: any, isLoading: boolean } = useQuery<any>(['allPosts'], fetchAllPosts);

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
        {isLoading ? <Text>로딩중</Text> : data.posts.map((tweet: PostProps) => (
          <Tweet
            key={tweet.idx}
            profileImage=""
            username="오바마"
            date={tweet.createdAt}
            contentText={tweet.content}
            comments={TweetComments}
            contentImageList={tweet.postImages}
          />
        ))}
        {/* <Tweet
            profileImage=""
            username="오바마"
            date="2022/01/01"
            contentText="새해복 많이 받으세요"
            comments={TweetComments}
            contentImageList="/asdf"
          /> */
        }
      </View>
      <Upload />
    </Container>
  );
}
