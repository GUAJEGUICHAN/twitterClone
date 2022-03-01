import React, { useRef } from 'react';

import { Animated, Text, View } from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

import styled from 'styled-components/native';

import { useQueryClient } from 'react-query';

const Container = styled.Pressable``;

const AnimatedIconContainer = styled(Animated.createAnimatedComponent(View))`
`;

interface CommeentHeaderProps {
  idx: Number,
  commentToggle: Boolean,
  setCommentToggle: React.Dispatch<React.SetStateAction<Boolean>>,
}

export default function CommentHeader({
  idx,
  commentToggle,
  setCommentToggle,
}: CommeentHeaderProps) {
  const queryClient = useQueryClient();

  const degree = useRef(new Animated.Value(0)).current;
  const turnedDegree = degree.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
    extrapolate: 'clamp',
  });

  return (
    <Container
      style={{
        marginVertical: 5,
      }}
      onPress={() => {
        setCommentToggle((prev) => !prev);
        queryClient.refetchQueries([`comments${idx}`]);
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
    </Container>
  );
}
