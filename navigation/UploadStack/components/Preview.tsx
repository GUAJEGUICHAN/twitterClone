import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

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

const ImageView = styled.View<{ isOne: boolean }>`
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
}
interface PreviewProp {
  images: ImageDataProp[],
  setImages: Function,
}

function Preview({ images, setImages }: PreviewProp): React.CElement<PreviewProp, any> {
  const removeImage = (index: number) => {
    setImages(images.filter((e, idx) => index !== idx));
  };

  return (
    <Container>
      {images.length !== 0 ? (
        <ImageContainer>
          {images.map((e, idx) => (
            <ImageView isOne={images.length === 1} key={idx}>
              <ImageWrapper>
                <ImageInstance
                  style={StyleSheet.absoluteFill}
                  source={{ uri: e.uri }}
                />
                <DelBtn
                  onPress={() => {
                    removeImage(idx);
                  }}
                >
                  <Ionicons size={30} color="black" name="close-circle" />
                </DelBtn>
              </ImageWrapper>
            </ImageView>
          ))}
        </ImageContainer>
      ) : null}
    </Container>
  );
}

export default React.memo(Preview);
