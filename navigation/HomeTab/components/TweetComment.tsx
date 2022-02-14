import React from 'react';

import { Text, View } from 'react-native';

type TweetCommentProps = {
  color: string,
  name: string,
  content: string
}

export default function TweetComment({ color, name, content }: TweetCommentProps)
  : React.FunctionComponentElement<View> {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        margin: 5,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          width: 10,
          height: 10,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          flex: 12,
        }}
      >
        <View>
          <View>
            <Text>
              {name}
              /시간 날짜
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              borderTopWidth: 1,
              borderTopColor: 'gray',
            }}
          >
            <Text>{content}</Text>
          </View>

        </View>
      </View>
    </View>
  );
}
