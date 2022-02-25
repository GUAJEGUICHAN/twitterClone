import { BASE_URL } from '@env';

type PostsProps = {
  posts: Array<any>,
  total_page: Number,
  current_page: Number,
}

export async function fetchAllPosts({ pageParam = 0 }) {
  const url = `${BASE_URL}/api/posts?page=${pageParam}`;

  const data: PostsProps = await fetch(url)
    .then((res) => (res.json()));

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
  }).then((res) => (res.json()))
    .catch(() => ({ jwt: 'err' }));

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

export async function uploadPost({ accessToken, content, images }) {
  const url = `${BASE_URL}/api/member/posts`;

  const formData = new FormData();
  formData.append('title', 'title');
  formData.append('content', content);
  images.forEach((image) => {
    const ext = image.uri.split('.').pop();
    const filename = image.uri.split('/').pop();
    formData.append(
      'img',
      {
        uri: image.uri,
        name: filename,
        type: `image/${ext}`,
      },
    );
  });
  console.log(formData);

  const data = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken.jwt}`,
    },
    body: formData,
  }).then((res) => (res.json())).catch((err) => {
    console.log('err', err);

    return new Error(err);
  });

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

export async function getGetCommentsByPost({ idx }) {
  const url = `${BASE_URL}/api/posts/${idx}/comments`;

  const data = await fetch(url).then((res) => (res.json()));
  console.log('getGetCommentsByPost', data);
  return data;
}

export async function uploadComment({ idx, comment, accessToken }) {
  const url = `${BASE_URL}/api/posts/${idx}/comments`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken.jwt}`,
    },
    body: JSON.stringify({
      content: comment,
    }),
  }).then((res) => (res.json())).catch((err) => {
    console.log(err);
  });
  return 0;
}
