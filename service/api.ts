import { BASE_URL } from '@env';

type PostsProps = {
  posts: Array<any>;
  total_page: Number;
  current_page: Number;
};

type myInfoProps = {
  idx: number;
  email: string;
  password: string;
  username: string;
  image: Object;
  auth: string;
  createdAt: Date;
};

// type Image = {
//   uri: string;
//   saveName: string;
//   url: string;
// };

// export async function fetchAllPosts({ pageParam = 0 }) {
//   const url = `${BASE_URL}/api/posts?page=${pageParam}`;
//   console.log(url);
//   const data: PostsProps = await fetch(url).then((res) => res.json());

//   return data;
// }

export async function fetchMyPosts({ pageParam = 0, queryKey }) {
  const [_, accessToken] = queryKey;

  const response = await fetch(
    `${BASE_URL}/api/member/posts?page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.jwt}`,
      },
    },
  );
  const data: PostsProps = await response.json();
  return data;
}

// const createImage = async (url: string, fileName: string): Promise<File> => {
//   console.log(`https://sign.u-class.co.kr/${url}`);
//   const response = await fetch(`https://sign.u-class.co.kr/${url}`);
//   const data = await response.blob();
//   const metaData = { type: "image/png" };
//   console.log(data);
//   const file = new File([data], fileName, metaData);
//   console.log(file);
//   return file;
// };

// export async function updatePost({ idx, accessToken, content, images }) {
//   const url = `${BASE_URL}/api/member/posts/${idx}`;

//   const formData = new FormData();
//   formData.append("title", "title");
//   formData.append("content", content);
//   images.forEach(async (image: Image) => {
//     let ext = "";
//     let filename = "";

//     if (image.uri) {
//       ext = image.uri.split(".").pop();
//       filename = image.uri.split("/").pop();
//       formData.append("img", {
//         uri: image.uri,
//         name: filename,
//         type: `image/${ext}`,
//       });
//     } else {
//       filename = image.url.split("/").pop();

//       const file = await createImage(`${BASE_URL}${image.url}`, filename);
//       console.log({ ...file });
//       formData.append("img", file);
//     }
//   });
//   console.log(content);
//   const data = await fetch(url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${accessToken.jwt}`,
//     },
//     body: formData,
//   })
//     .then((res) => res.json())
//     .catch((err) => {
//       console.log(err);
//       return { jwt: "err" };
//     });

//   return data;
// }

export async function getMyInfo({ queryKey }) {
  const [_, accessToken] = queryKey;

  const response = await fetch(`${BASE_URL}/api/member/`, {
    headers: {
      Authorization: `Bearer ${accessToken.jwt}`,
    },
  });
  const data: myInfoProps = await response.json();
  return data;
}

// export async function postLogin({ email, password }) {
//   const url = `${BASE_URL}/api/member/authentication`;

//   const data = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((res) => res.json())
//     .catch(() => ({ jwt: "err" }));

//   return data;
// }

// export async function postSignup({ email, username, password }) {
//   const url = `${BASE_URL}/api/member`;

//   const data = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, username, password }),
//   })
//     .then((res) => res.json())
//     .catch(() => ({ jwt: "err" }));
//   console.log("postSignup", data);

//   return data;
// }

// export async function deletePost({ idx, accessToken }) {
//   const url = `${BASE_URL}/api/member/posts/${idx}`;

//   console.log(idx, accessToken);

//   await fetch(url, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${accessToken.jwt}`,
//     },
//   })
//     .then((res) => res.json())
//     .catch((err) => {
//       console.log(err);
//     });
// }

export async function fetchAllPosts({ pageParam = 0, queryKey }) {
  const [_, query] = queryKey;

  const url = `${BASE_URL}/api/posts?page=${pageParam}&query=${query}`;
  console.log(url);
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

export async function updatePost({
  idx, accessToken, content, images,
}) {
  const url = `${BASE_URL}/api/member/posts/${idx}`;

  const formData = new FormData();
  formData.append('title', 'title');
  formData.append('content', content);

  images.map((image: any) => {
    let ext = '';
    let filename = '';
    // ????????? ????????? ??????
    if (image.uri) {
      ext = image.uri.split('.').pop();
      filename = image.uri.split('/').pop();
    }
    // ????????? ????????? ?????? - ??????????????? ?????????
    else {
      ext = image.extension.split('.').pop();
      filename = image.url.split('/').pop();
    }

    formData.append('img', {
      uri: image.uri ? image.uri : `${BASE_URL}${image.url}`,
      name: filename,
      type: `image/${ext}`,
    });
  });

  const data = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
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

export async function deleteComment({ commentIdx, accessToken }) {
  const url = `${BASE_URL}/api/posts/comments/${commentIdx}`;

  const data = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken.jwt}`,
    },
  }).then((res) => (res.json())).catch((err) => {
    console.log(err);
  });
  console.log(data);
  return 0;
}

export async function updateComment({ commentIdx, content, accessToken }) {
  const url = `${BASE_URL}/api/posts/comments/${commentIdx}`;

  const data = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken.jwt}`,
    },
    body: JSON.stringify({ content }),
  }).then((res) => (res.json())).catch((err) => {
    console.log('ERR??', err);
  });
  console.log(data);
  return 0;
}
