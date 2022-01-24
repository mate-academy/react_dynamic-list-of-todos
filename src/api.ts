const BASE_URL = 'https://mate.academy/students-api/';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status}-${res.statusText}`);
      }

      return res.json();
    });
};

export const getTodos = () => {
  return request('todos');
};

export const getUser = (userID: number) => {
  return request(`users/${userID}`);
};
