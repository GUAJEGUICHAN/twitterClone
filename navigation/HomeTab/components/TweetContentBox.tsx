import React from 'react';
import TweetTextContainer from './TweetTextContainer';
import TweetTextEditBox from './TweetTextEditBox';

interface ImagePostProps {
  idx: number,
  name: string,
  originalName: string,
  saveName: string,
  size: number,
  uploadPath: string,
  extension: string,
  url: string,
  createdAt: string
}

interface Item {
  idx: number,
  title: string,
  content: string,
  member: { username: string, image: { url: string } },
  createdAt: string,
  deletedAt: string,
  updatedAt: string,
  postImages: Array<ImagePostProps>
}

interface TweetContentBoxProps {
  isEditMode: Boolean,
  setNewContent: React.Dispatch<React.SetStateAction<string>>,
  newContent: string,
  item: Item,
}

export default function TweetContentBox({
  isEditMode, setNewContent, newContent, item,
}: TweetContentBoxProps): React.ReactElement {
  const { createdAt, content, member: { username } } = item;

  return (
    isEditMode
      ? (
        <TweetTextEditBox
          setNewContent={setNewContent}
          newContent={newContent}
        />
      )
      : (
        <TweetTextContainer
          username={username}
          date={createdAt}
          contentText={content}
        />
      )
  );
}
