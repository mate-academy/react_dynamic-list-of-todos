const url = 'https://mate-api.herokuapp.com';

export async function getTodosApi() {
  const list = await fetch(`${url}/todos`)
    .then(response => response.json());

  return list;
}

export async function getUserInfoApi(userId) {
  const list = await fetch(`${url}/users/${userId}`)
    .then(response => response.json());

  return list;
}
