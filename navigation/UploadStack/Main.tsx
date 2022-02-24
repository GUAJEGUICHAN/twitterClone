import React, { useCallback, useState } from 'react';
import { Text, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import Preview from './components/Preview';
import { uploadPost } from '../../service/api';

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

const Message = styled.TextInput`
  color: black;
  padding-bottom: 20px;
`;

const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 100px;
`;

const BtnColumn = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 50px;
`;

const ImgBtn = styled.TouchableOpacity<{ isDisabled: boolean }>`
  opacity: ${(props) => (props.isDisabled ? '0.5' : '1')};
`;
const SendBtn = styled.TouchableOpacity`
  padding: 5px 10px;
  background-color: #6baae8;
  border-radius: 20px;
`;

function Main() {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');

  const naviation = useNavigation();
  const queryClient = useQueryClient();
  const ACCESS_TOKEN = queryClient.getQueryData('ACCESS_TOKEN');

  const handleChangeText = useCallback((text: string) => {
    setContent(text);
  }, []);

  const upload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImages((prev) => [...prev, result]);
      }
    } catch (e) {
      console.log(e);
    }
  };
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
        <Message
          multiline
          numberOfLines={10}
          returnKeyType="done"
          style={{
            height: 200,
            textAlignVertical: 'top',
            borderBottomWidth: 2,
            borderBottomColor: '#6BAAE8',
          }}
          onChangeText={handleChangeText}
          placeholder="글이나 사진을 올려주세요."
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
        <Preview images={images} setImages={setImages} />
        <BtnColumn>
          <ImgBtn isDisabled={images.length === 4} onPress={upload} disabled={images.length === 4}>
            <Ionicons size={30} color="#6BAAE8" name="image" />
          </ImgBtn>
          <SendBtn onPress={
            () => {
              uploadPost({
                accessToken: ACCESS_TOKEN,
                content,
                images,
              }).then((msg) => {
                console.log('msg', msg);
                if (msg.meesage === undefined) {
                  console.log('정상작동');
                  queryClient.refetchQueries(['allPosts']);
                  naviation.goBack();
                } else {
                  console.log('msg', msg.message);

                  throw new Error('에러');
                }
              }).catch((error) => {
                console.log('error', error);
              });
            }
          }
          >
            <Text style={{ color: 'white' }}>올리기</Text>
          </SendBtn>
        </BtnColumn>
      </Right>
    </Container>
  );
}

export default Main;
