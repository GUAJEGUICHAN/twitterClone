import React, { useEffect, useState } from 'react';

import { Keyboard, Text } from 'react-native';

import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import moment from 'moment';
import { useQueryClient, useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import Preview from './components/Preview';

import { updatePost, deletePost } from '../../service/api';
import TweetCommentsContainer from '../HomeTab/components/TweetCommentsContainer';

const Container = styled.View`
  padding: 30px 20px 0 20px;
  flex-direction: row;
`;

const Left = styled.View``;

const Right = styled.View`
  margin-left: 20px;
  flex: 1;
  justify-content: flex-end;
`;

const TitleColumn = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 10px;
`;

const BtnMenus = styled.View`
  flex-direction: row;
`;
const Name = styled.Text`
  font-size: 28px;
  font-weight: 600;
`;
const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 100px;
`;
const Message = styled.TextInput`
  color: black;
  padding-bottom: 20px;
`;

const BtnColumn = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 50px;
`;

const Btn = styled.TouchableOpacity`
  padding: 5px 15px;
  background-color: #6baae8;
  margin-left: 10px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const ImgBtn = styled.TouchableOpacity<{ isDisabled: boolean }>`
  opacity: ${(props) => (props.isDisabled ? '0.5' : '1')};
`;
// const SendBtn = styled.TouchableOpacity`
//   padding: 5px 10px;
//   background-color: #6baae8;
//   border-radius: 20px;
// `;

const PostInfo = styled.Text`
  color: #000000;
  font-size: 15px;
  margin-top: 3px;
`;

// type TweetProps = {
//   idx: number;
//   profileImage: string;
//   username: string;
//   date: string;
//   contentText: string;
//   contentImageList: Array<any>;
//   comments: Array<any>;
// };

function Detail({ route: { params } }: { route: { params: any } }): React.ReactElement {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const accessToken: string = queryClient.getQueryData('ACCESS_TOKEN');
  const myInfo: { idx: number } = queryClient.getQueryData([
    'myInfo',
    accessToken,
  ]);

  const {
    refetch,
  }: { data: any; isLoading: boolean; refetch: any } = useQuery<any>(
    ['updatePost'],
    () => {
      updatePost({
        idx: params.idx,
        accessToken,
        content: text,
        images,
      });
    },
    {
      enabled: false,
    },
  );

  const { refetch: deleteThat }: { data: any; refetch: any } = useQuery<any>(
    ['deletePost'],
    () => {
      deletePost({ idx: params.idx, accessToken });
    },
    { enabled: false },
  );

  const upload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImages([...images, result]);
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setImages(params.postImages);
  }, []);

  useEffect(() => {
    setText(params.content);
  }, [params]);

  return (
    <Container>
      <Left>
        <Image
          source={{
            uri: 'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/hm/2020/12/11/202012111655103390984_20201211165529_01.jpg',
          }}
        />
      </Left>
      <Right>
        <TitleColumn>
          <Name>{params.member.username}</Name>
          <BtnMenus>
            {myInfo && params.member ? (
              params.member.idx === myInfo.idx ? (
                editMode ? (
                  <Btn
                    onPress={() => {
                      setEditMode(false);
                      refetch();
                    }}
                  >
                    <Text style={{ color: 'white' }}>저장</Text>
                  </Btn>
                ) : (
                  <>
                    <Btn
                      onPress={() => {
                        setEditMode(true);
                      }}
                    >
                      <Text style={{ color: 'white' }}>수정</Text>
                    </Btn>
                    <Btn
                      onPress={() => {
                        deleteThat();
                        navigation.goBack();
                      }}
                    >
                      <Text style={{ color: 'white' }}>삭제</Text>
                    </Btn>
                  </>
                )
              ) : null
            ) : null}
          </BtnMenus>
        </TitleColumn>

        <Message
          multiline
          numberOfLines={10}
          returnKeyType="done"
          editable={editMode}
          style={{
            height: 200,
            textAlignVertical: 'top',
            borderBottomWidth: 2,
            borderBottomColor: '#6BAAE8',
          }}
          placeholder="글이나 사진을 올려주세요."
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          onChange={({ nativeEvent: { text: newText } }) => {
            setText(newText);
          }}
          defaultValue={text}
        />
        <PostInfo>{moment(params.date).format('dddd Do MMMM, YYYY')}</PostInfo>

        <Preview images={images} setImages={setImages} edit={editMode} />

        {myInfo && params.member ? (
          params.member.idx === myInfo.idx ? (
            !editMode ? null : (
              <BtnColumn>
                <ImgBtn
                  isDisabled={images.length === 4}
                  onPress={upload}
                  disabled={images.length === 4}
                >
                  <Ionicons size={30} color="#6BAAE8" name="image" />
                </ImgBtn>
              </BtnColumn>
            )
          ) : null
        ) : null}

        <TweetCommentsContainer
          idx={params.idx}
          accessToken={accessToken}
        />
      </Right>
    </Container>
  );
}

export default Detail;
