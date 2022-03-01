import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const Container = styled.View``;

const ImageContainer = styled.View`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 300px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
`;

const ImageView = styled.TouchableOpacity<{ isOne: boolean }>`
  width: ${(props) => (props.isOne ? '100%' : '50%')};
  height: ${(props) => (props.isOne ? '100%' : '50%')};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ImageWrapper = styled.View`
  position: relative;
  width: 90%;
  height: 90%;
`;

const ImageInstance = styled.Image`
  border-radius: 30px;
`;

const DelBtn = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  box-shadow: 1px 1px 5px lightgray;
`;

interface ImageDataProp {
  cancelled: boolean;
  height: number;
  width: number;
  type: string;
  uri: string;
  url:string
}
interface PreviewProp {
  images: ImageDataProp[],
  setImages: Function,
  edit:boolean,
}

function Preview({ images, setImages, edit }: PreviewProp): React.CElement<PreviewProp, any> {
  const navigation = useNavigation();

  const removeImage = (index: number) => {
    setImages(images.filter((e, idx) => index !== idx));
  };

  return (
    <Container>
      {images.length !== 0 ? (
        <ImageContainer>
          {images.map((e, idx) => (
            <ImageView
              isOne={images.length === 1}
              key={idx}
              onPress={() => {
                navigation.navigate('Popup', {
                  screen: 'View',
                  params: {
                    image: e.uri ? e.uri : e.url,
                    local: !!e.uri,
                  },
                });
              }}
            >
              <ImageWrapper>
                <ImageInstance
                  style={StyleSheet.absoluteFill}
                  source={{ uri: e.uri ? e.uri : `http://146.56.36.179:8080${e.url}` }}
                />
                {edit ? (
                  <DelBtn
                    onPress={() => {
                      removeImage(idx);
                    }}
                  >
                    <Ionicons size={30} color="black" name="close-circle" />
                  </DelBtn>
                ) : null}

              </ImageWrapper>
            </ImageView>
          ))}
        </ImageContainer>
      ) : null}
    </Container>
  );
}

export default React.memo(Preview);
