import React, { useRef, useState } from "react";
import { Text, TextInput } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Preview from "./components/Preview";

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
  border-radius: 100;
`;

const BtnColumn = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 50px;
`;

const ImgBtn = styled.TouchableOpacity``;
const SendBtn = styled(ImgBtn)`
  padding: 5px 10px;
  background-color: #6baae8;
  border-radius: 20px;
`;

const Main = () => {
  // const inputRef = useRef<null | HTMLInputElement>(null);
  const [form, setForm] = useState(null);
  const [image, setImage] = useState(null);
  const upload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setImage(result);

    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Left>
        <Image
          source={{
            uri: "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/hm/2020/12/11/202012111655103390984_20201211165529_01.jpg",
          }}
        />
      </Left>
      <Right>
        <Message
          multiline={true}
          numberOfLines={10}
          style={{
            height: 200,
            textAlignVertical: "top",
            borderBottomWidth: 2,
            borderBottomColor: "#6BAAE8",
          }}
          placeholder="글이나 사진을 올려주세요."
        />
        <Preview data={image}></Preview>
        <BtnColumn>
          <ImgBtn onPress={upload}>
            <Ionicons size={30} color="#6BAAE8" name="image" />
          </ImgBtn>
          <SendBtn>
            <Text style={{ color: "white" }}>올리기</Text>
          </SendBtn>
        </BtnColumn>
      </Right>
    </Container>
  );
};

export default Main;
