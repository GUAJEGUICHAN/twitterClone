import React, { useState } from 'react';

import { Pressable, TextInput, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters,
} from 'react-query';
import { uploadComment } from '../../../service/api';

interface CommentTextInputProps {
  idx: Number,
  getComments: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) =>
    Promise<QueryObserverResult<InfiniteData<any>, unknown>>,
  accessToken: String
}

export default function CommentTextInput({
  idx,
  getComments,
  accessToken,
}: CommentTextInputProps): React.ReactElement {
  const [comment, setComment] = useState('');

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  return (
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
        value={comment}
        onChangeText={handleCommentChange}
      />
      <Pressable onPress={() => {
        uploadComment({ idx, comment, accessToken }).then(() => {
          setComment('');
          getComments();
        });
      }}
      >
        <MaterialCommunityIcons
          name="send-circle"
          size={20}
          color="skyblue"
        />
      </Pressable>
    </View>
  );
}
