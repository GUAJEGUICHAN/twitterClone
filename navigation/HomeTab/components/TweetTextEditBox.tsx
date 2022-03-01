import React from 'react';

import { TextInput } from 'react-native';

interface TweetTextEditBoxProps {
  setNewContent: React.Dispatch<React.SetStateAction<string>>
  newContent: string
}

export default function TweetTextEditBox({ setNewContent, newContent }: TweetTextEditBoxProps)
  : React.ReactElement {
  const handleContentChange = (text: string) => {
    setNewContent(text);
  };

  return (
    <TextInput
      multiline
      value={newContent}
      onChangeText={handleContentChange}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        borderColor: 'black',
        backgroundColor: '#E2E8EC',
        height: 70,
        borderRadius: 10,
        padding: 10,
      }}
    />
  );
}
