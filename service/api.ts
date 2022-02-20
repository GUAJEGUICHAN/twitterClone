type PostsProps = {
  posts: Array<any>,
  total_page: Number,
  current_page: Number,
}

export async function fetchAllPosts() {
  const url = '146.56.36.179:8080/api/posts';
  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  return data;
}
