import React, { useEffect, useState } from 'react';
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

const ShowMeTheImg = styled.TouchableOpacity``;

interface PreviewProp {
  images: any;
  setImages: Function;
  isItOwn: boolean;
}

const Preview: React.FC<PreviewProp> = ({ images, setImages, isItOwn }) => {
  const [isOne, setIsOne] = useState(false);
  const [own, setOwn] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (images.length === 1) {
      setIsOne(true);
    } else if (isOne) {
      setIsOne(false);
    }
  }, [images]);

  useEffect(() => {
    setOwn(isItOwn);
  }, [isItOwn]);
  const removeImage = (index: number) => {
    setImages(images.filter((e, idx) => index !== idx));
  };

  return (
    <Container>
      {images.length !== 0 ? (
        <ImageContainer>
          {images.map((e, idx) => (
            <ImageView
              isOne={isOne}
              key={idx}
              onPress={() => {
                navigation.navigate('Popup', {
                  screen: 'View',
                  params: {
                    image: e.url ? e.url : e.uri,
                    local: !e.url,
                  },
                });
              }}
            >
              <ImageWrapper>
                <ImageInstance
                  style={StyleSheet.absoluteFill}
                  source={{
                    uri: e.uri || `http://146.56.36.179:8080${e.url}`,
                  }}
                />
                {own ? (
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
};

export default Preview;
