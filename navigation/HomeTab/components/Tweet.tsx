import React, { useCallback, useRef, useState } from 'react';

import {
  Animated,
  Image,
  Pressable, Text, TextInput, View,
} from 'react-native';

import {
  Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons,
} from '@expo/vector-icons';

import styled from 'styled-components/native';

import { useInfiniteQuery, useQueryClient } from 'react-query';

import TweetComment from './TweetComment';

import {
  deletePost, getGetCommentsByPost, updatePost, uploadComment,
} from '../../../service/api';

const ComponentContainer = styled.View`
  display:flex;
  flex-direction:row;
  background-color:white;
  width:${'100%'};
  padding:20px;
  border: 1px white;
  border-bottom-color:#E2E8EC;
`;

const ProfileImageContainer = styled.View`
  flex:2;
`;

const ProfileImage = styled.View`
  background-color:skyblue;
  width:50px;
  height:50px;
  border-radius: 50px;
`;

const ContentContainer = styled.View`
  flex:9;
`;

const TweetContainer = styled.View`
`;

const TweetHeader = styled.View`
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  border: 1px #E2E8EC ;
  /* border-bottom-color: gray; */
  /* padding-bottom:10px; */
  /* border-right-color: gray; */
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

const TweetTextContainer = styled.View`
  background-color:#E2E8EC;
  border-radius:10px;
  padding:10px;
`;

const TweetImageContainer = styled.View`
  margin:10px 0;
`;

const TweetCommentContainer = styled.View`  
`;

const CommentContainer = styled.View`
`;
const AnimatedIconContainer = styled(Animated.createAnimatedComponent(View))`
`;

const CommentHeader = styled.Pressable`
`;

type TweetProps = {
  idx: number,
  profileImage: string,
  username: string,
  date: string,
  contentText: string,
  contentImageList: Array<any>,
}

export default function Tweet({
  idx,
  profileImage = '',
  username,
  date,
  contentText,
  contentImageList = [],
}: TweetProps) {
  const [commentToggle, setCommentToggle] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(contentText);
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();
  const ACCESS_TOKEN = queryClient.getQueryData('ACCESS_TOKEN');

  const {
    data: commentsData = { pages: { commemts: [] } },
    // data: commentsData,
    isLoading,
    refetch: getComments,
    isRefetching: isRefetchingComments,
    hasNextPage: hasCommentsNextPage,
    fetchNextPage: fetchCommentsNextPage,
  }: any = useInfiniteQuery<any>(
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

  const degree = useRef(new Animated.Value(0)).current;
  const turnedDegree = degree.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
    extrapolate: 'clamp',
  });

  const handleContentChange = useCallback((text: string) => {
    setNewContent(text);
  }, []);

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  return (
    <ComponentContainer>
      <ProfileImageContainer>
        {profileImage
          ? true
          : <ProfileImage />}
      </ProfileImageContainer>
      <ContentContainer>
        <TweetContainer>
          {isEditMode
            ? (
              <View>
                <TextInput
                  multiline
                  value={newContent}
                  onChangeText={handleContentChange}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                    borderColor: 'black',
                    backgroundColor: '#E2E8EC',
                    height: 70,
                    borderRadius: 10,
                    padding: 10,
                  }}
                />
              </View>
            )
            : (
              <TweetTextContainer>
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
              </TweetTextContainer>
            )}
          <TweetImageContainer>
            {/* <Image source={contentImage||''}/> */}
            {
              contentImageList.map((image) => (
                <Image
                  key={image.idx}
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: 'lightgray',
                    backgroundColor: 'lightgray',
                    width: '100%',
                    height: 200,
                  }}
                  source={{
                    // uri: process.env.BASE_URL + image.url
                    uri: `http://146.56.36.179:8080${image.url}`,
                  }}
                />
              ))
            }
          </TweetImageContainer>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <Pressable onPress={async () => {
              if (isEditMode === true) {
                // 수정내용 전달, 업데이트
                await updatePost({ idx, accessToken: ACCESS_TOKEN, content: newContent });
                queryClient.refetchQueries(['allPosts']);
              } else {
                // 그냥 아무것도 안함
              }
              setEditMode((prev) => !prev);
            }}
            >
              {isEditMode
                ? (<Ionicons name="save-outline" size={20} />)
                : (<Feather name="edit-2" size={20} />)}

            </Pressable>
            <Pressable onPress={async () => {
              await deletePost({ idx, accessToken: ACCESS_TOKEN });
              queryClient.refetchQueries(['allPosts']);
            }}
            >
              <Ionicons name="trash-outline" size={20} />
            </Pressable>
          </View>
        </TweetContainer>
        <CommentContainer>
          <CommentHeader
            style={{
              marginVertical: 5,
            }}
            onPress={() => {
              setCommentToggle((prev) => !prev);
              getComments();
              if (commentToggle) {
                Animated.spring(degree, { toValue: 0, useNativeDriver: true }).start();
              } else {
                Animated.spring(degree, { toValue: 90, useNativeDriver: true }).start();
              }
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <AnimatedIconContainer
                style={{
                  transform: [{ rotateZ: turnedDegree }],
                }}
              >
                <SimpleLineIcons
                  name="arrow-right"
                  size={12}
                  color="skyblue"
                />
              </AnimatedIconContainer>
              <Text
                style={{
                  marginLeft: 10,
                }}
              >
                댓글
              </Text>
            </View>
          </CommentHeader>
          {commentToggle ? (
            <TweetCommentContainer>
              {isLoading || isRefetchingComments || commentsData === undefined
                ? (<Text> 로딩중</Text>)
                : commentsData.pages.map((page) => page.comments).flat().map(({
                  idx: commentIdx, member, createdAt, content,
                }) => (
                  <TweetComment
                    key={commentIdx}
                    createdAt={createdAt}
                    color="black"
                    name={member.username}
                    content={content}
                  />
                ))}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    height: 20,
                    fontSize: 12,
                    paddingLeft: 8,
                    backgroundColor: 'lightgray',
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                  value={comment}
                  onChangeText={handleCommentChange}
                />
                <Pressable onPress={() => {
                  uploadComment({ idx, comment, accessToken: ACCESS_TOKEN }).then(() => {
                    setComment('');
                    getComments();
                  });
                }}
                >
                  <MaterialCommunityIcons
                    name="send-circle"
                    size={20}
                    color="skyblue"
                  />
                </Pressable>

              </View>
            </TweetCommentContainer>
          )
            : false}
        </CommentContainer>
      </ContentContainer>
    </ComponentContainer>
  );
}
