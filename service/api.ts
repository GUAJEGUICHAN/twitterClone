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
}

export async function postSignup({ email, username, password }) {
  const url = `${BASE_URL}/api/member`;

  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  }).then((res) => (res.json())).catch(() => ({ jwt: 'err' }));
  console.log('postSignup', data);

  return data;
}

export async function updatePost({ idx, accessToken, content }) {
  const url = `${BASE_URL}/api/member/posts/${idx}`;

  const formData = new FormData();
  formData.append('title', 'title');
  formData.append('content', content);

  const data = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken.jwt}`,
    },
    body: formData,
  }).then((res) => res.json()).catch((err) => {
    console.log(err);
    return ({ jwt: 'err' });
  });
  console.log('edit', data);

  // return data;
}

export async function deletePost({ idx, accessToken }) {
  const url = `${BASE_URL}/api/member/posts/${idx}`;

  console.log(idx, accessToken);

  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken.jwt}`,
    },
  }).then((res) => (res.json())).catch((err) => {
    console.log(err);
  });
}
