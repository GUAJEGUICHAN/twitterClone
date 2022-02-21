import React, { useRef, useState } from 'react';

import {
  Animated,
  Image,
  Pressable, Text, TextInput, View,
} from 'react-native';

import {
  Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons,
} from '@expo/vector-icons';

import styled from 'styled-components/native';

import TweetComment from './TweetComment';

const ComponentContainer = styled.View`
  display:flex;
  flex-direction:row;
  background-color:white;
  width:${'100%'};
  padding:20px;
  border: 1px solid white;
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
  border: 1px #E2E8EC solid;
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
  profileImage: string,
  username: string,
  date: string,
  contentText: string,
  contentImageList: Array<any>,
  comments: Array<any>,
}

export default function Tweet({
  profileImage = '',
  username,
  date,
  contentText,
  contentImageList = [],
  comments,
}: TweetProps) {
  const [commentToggle, setCommentToggle] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const degree = useRef(new Animated.Value(0)).current;

  const turnedDegree = degree.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
    extrapolate: 'clamp',
  });

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
                  value={contentText}
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
            <Pressable onPress={() => { setEditMode((prev) => !prev); }}>
              {isEditMode
                ? (<Ionicons name="save-outline" size={20} />)
                : (<Feather name="edit-2" size={20} />)}

            </Pressable>
            <Ionicons name="trash-outline" size={20} />
          </View>
        </TweetContainer>
        <CommentContainer>
          <CommentHeader
            style={{
              marginVertical: 5,
            }}
            onPress={() => {
              setCommentToggle((prev) => !prev);
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
              {comments.map(({
                id, color, name, content,
              }) => (
                <TweetComment
                  key={id}
                  color={color}
                  name={name}
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
                />
                <MaterialCommunityIcons name="send-circle" size={20} color="skyblue" />
              </View>
            </TweetCommentContainer>
          )
            : false}
        </CommentContainer>
      </ContentContainer>
    </ComponentContainer>
  );
}