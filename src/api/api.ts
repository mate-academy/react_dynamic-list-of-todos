// eslint-disable-next-line
const BASE_URL = `https://mate.academy/students-api`;

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};
