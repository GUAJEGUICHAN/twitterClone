import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Text, FlatList } from 'react-native';

import { useInfiniteQuery } from 'react-query';
import Upload from './components/Upload';
import { fetchAllPosts } from '../../service/api';
import Tweet from './components/Tweet';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  position: relative;
  height: ${SCREEN_HEIGHT}px;
`;
const SearchBar = styled.TextInput`
  background-color: #f0f3f4;
  padding: 15px 15px;
  border-radius: 15px;
  width: 90%;
  font-size: 20px;
  margin: 20px auto;
  margin-bottom: 40px;
`;




const Footer = styled.View`
  height: 170px;
`;

type ImagePostProps = {
  idx: number;
  name: string;
  originalName: string;
  saveName: string;
  size: number;
  uploadPath: string;
  extension: string;
  url: string;
  createdAt: string;
};interface Item {
  idx: number,
  title: string,
  content: string,
  member: { username: string, image: { url: string } },
  createdAt: string,
  deletedAt: string,
  updatedAt: string,
  postImages: Array<ImagePostProps>
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [onSearch,setOnSearch] = useState(false);
  const [noData,setNoData] = useState(true);
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch: search,
  }: any = useInfiniteQuery<any>(['search', query], fetchAllPosts, {
    enabled: false,
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.current_page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },

  });


  useEffect(()=>{
    if(data){
      if(data.pages[0].total_page==-1){
        setNoData(true);
      }
      else{
        setNoData(false);
      }
    }
  
  },[data])

  
  const renderItem = ({ item }: { item: Item }) => (
    <Tweet
      key={item.idx}
      idx={item.idx}
      item={item}
    />
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search Twitter"
        onChange={({ nativeEvent: { text} })=>{setQuery(text)}}
        onSubmitEditing={({ nativeEvent: { text} }) => {
          setQuery(text)
          query.length!=0&&search();

        }}
      />
      
    
      {(isLoading ? (
        <Text> 로딩중</Text>
      ) : (
        <FlatList
          style={{
            flex: 1,

          }}
          data={data&&data.pages.map((page) => page.posts).flat()}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.idx}`}
          onEndReached={loadMore}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <Footer />}

        />
      ))}
      <Upload />
    </Container>
  );
}
