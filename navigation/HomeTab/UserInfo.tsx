import React from "react";

import { Text, Dimensions, FlatList } from "react-native";

import { CommonActions } from "@react-navigation/native";

import styled from "styled-components/native";

import PropTypes from "prop-types";

import { useQueryClient, useInfiniteQuery } from "react-query";

import Tweet from "./components/Tweet";
import Upload from "./components/Upload";
import { fetchMyPosts } from "../../service/api";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  position: relative;
  height: ${SCREEN_HEIGHT}px;
`;

const BackGround = styled.View`
  height: 180px;
  background-color: #e2e8ec;
  position: relative;
  margin-bottom: 60px;
`;

const Image = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  border-width: 4px;
  border-color: white;
  top: 115px;
  left: 20px;
`;
const BlueButton = styled.TouchableOpacity`
  background-color: #1d9bf0;
  margin-top: 20px;
  width: 200px;
  height: 50px;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  align-self: center;
`;

const Info = styled.View`
  padding: 20px 25px;
  border-bottom-width: 3px;
  border-bottom-color: #e2e8ec;
`;

const Name = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: black;
`;

const Footer = styled.View`
  height: 170px;
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

type PostProps = {
  idx: number;
  title: string;
  content: string;
  member: { username: string };
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  postImages: Array<ImagePostProps>;
};

export default function UserInfo({ navigation }) {
  const queryClient = useQueryClient();
  const ACCESS_TOKEN = queryClient.getQueryData("ACCESS_TOKEN");

  const {
    data: myPost,
    isLoading,
    isRefetching: isRefetchingMyPosts,
    hasNextPage,
    fetchNextPage,
  }: any = useInfiniteQuery<any>(["myPosts", ACCESS_TOKEN], fetchMyPosts, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.current_page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const TweetComments = [
    {
      id: 1,
      color: "red",
      name: "트럼프",
      content: "안녕하세요 오바마",
    },
    {
      id: 2,
      color: "blue",
      name: "오바마",
      content: "안녕하세요 트럼프",
    },
  ];

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

  const onRefresh = () => queryClient.refetchQueries(["myPosts"]);

  const loadMore = () => {
    console.log(hasNextPage);
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Container>
      <BackGround>
        <Image
          source={{
            uri: "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/hm/2020/12/11/202012111655103390984_20201211165529_01.jpg",
          }}
        />
      </BackGround>
      <Info>
        <Name>조유리</Name>
      </Info>

      {isLoading ? (
        <Text> 로딩중</Text>
      ) : (
        <FlatList
          style={{
            flex: 1,
          }}
          refreshing={isRefetchingMyPosts}
          onRefresh={onRefresh}
          data={myPost.pages.map((page) => page.posts).flat()}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.idx}`}
          ListFooterComponent={() => <Footer />}
          onEndReached={loadMore}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* <BlueButton
        onPress={() => {
          queryClient.setQueryData("ACCESS_TOKEN", undefined);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        }}
      >
        <Text>로그아웃</Text>
      </BlueButton> */}
      <Upload />
    </Container>
  );
}

UserInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
  }).isRequired,
};
