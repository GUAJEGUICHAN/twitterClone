import { BASE_URL } from '@env'

type PostsProps = {
  posts: Array<any>,
  total_page: Number,
  current_page: Number,
}

export async function fetchAllPosts() {
  const url = BASE_URL + '/api/posts';
  const response = await fetch(url);
  const data: PostsProps = await response.json();
  return data;
}
