import { BASE_URL } from '@env';

type PostsProps = {
  posts: Array<any>,
  total_page: Number,
  current_page: Number,
}

export async function fetchAllPosts() {
  const url = `${BASE_URL}/api/posts`;
  const response = await fetch(url);
  const data: PostsProps = await response.json();
  return data;
}

export async function postLogin({ email, password }) {
  const url = `${BASE_URL}/api/member/authentication`;

  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.json())).catch(() => ({ jwt: 'err' }));

  return data;
  // return 'test';
}
