import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { Text, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  height: ${SCREEN_HEIGHT - 150}px;

  justify-content: center;
`;
const Btn = styled.TouchableOpacity``;

// const Image = styled.View<{ image: string }>`
//   background-image: ${(props) =>
//     `url("http://146.56.36.179:8080${props.image}")`};
//   background-size: cover;
//   background-position: center center;
//   width: 100%;
//   height: ${SCREEN_WIDTH}px;
// `;

// interface imageProps {
//   image: string;
// }

function View({ route: { params }, navigation: { setOptions } }) {
  const navigation = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => null,
      title: '사진',
    });
  }, []);

  return (
    <Container>
      <ImageBackground
        source={{
          uri: params.local
            ? `${params.image}`
            : `http://146.56.36.179:8080${params.image}`,
        }}
        resizeMode="contain"
        style={{
          height: 500,
          width: '100%',
        }}
      />
    </Container>
  );
}

export default View;
