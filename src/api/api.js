const BASE_URL = 'https://mate-api.herokuapp.com';

function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(result => result.data);
}

function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export const getTodos = async () => {
  await wait(1000);
  return request(`/todos`);
}

export const getUser = async (userId) => {
  await wait(1000);
  return request(`/users/${userId}`);
}
