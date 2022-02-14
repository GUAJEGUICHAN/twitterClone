import React, { useState } from 'react';

import {
  Pressable, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import styled from 'styled-components/native';

import TweetComment from './TweetComment';

const ComponentContainer = styled.View`
  display:flex;
  flex-direction:row;
  background-color:white;
  width:${'90%'};
  margin-top:10px;
  padding:20px;
  border: 1px solid gray;
  
`;

const ProfileImageContainer = styled.View`
  flex:2;
/* background-color: red; */
`;
const ProfileImage = styled.View`
  background-color:skyblue;
  width:50px;
  height:50px;
  border-radius: 50px;
`;
const ContentContainer = styled.View`
  flex:8;
`;
const TweetContainer = styled.View`
`;
const TweetHeader = styled.View`
  border: 1px #E2E8EC solid;
  border-bottom-color: gray;
  padding-bottom:10px;
  /* border-right-color: gray; */
`;
const TweetContent = styled.View`
  margin-top:10px;
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
const CommentContainer = styled.View``;

type TweetProps = {
  profileImage: string,
  username: string,
  date: string,
  contentText: string,
  contentImage: string,
  comments: Array<any>,
}

export default function Tweet({
  profileImage = '', username, date, contentText, contentImage = '', comments,
}: TweetProps) {
  const [commentToggle, setCommentToggle] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

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
                    height: 100,
                  }}
                />
              </View>
            )
            : (
              <TweetTextContainer>
                <TweetHeader>
                  <Text
                    style={{
                      fontWeight: '300',
                      fontSize: 12,
                    }}
                  >
                    {username}
                    {' '}
                    {date}
                  </Text>
                </TweetHeader>
                <TweetContent>
                  <Text>{contentText}</Text>
                </TweetContent>
              </TweetTextContainer>
            )}
          <TweetImageContainer>
            {/* <Image source={contentImage||''}/> */}
            {
              contentImage
                ? (
                  <View
                    style={{
                      // flex: 1,
                      width: '100%',
                      height: 200,
                      backgroundColor: 'orange',
                      borderRadius: 30,
                    }}
                  />
                ) : false
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
          <TouchableOpacity
            style={{
              marginVertical: 5,
            }}
            onPress={() => { setCommentToggle((prev) => !prev); }}
          >
            <Text>댓글</Text>
          </TouchableOpacity>
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
