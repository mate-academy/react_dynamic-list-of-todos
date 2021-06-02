const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, option) => fetch(`${BASE_URL}${url}`, option)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} – ${res.statusText}`);
    }

    return res.json();
  });

export const getTodos = async() => request('/todos');

export const getUser = async userId => request(`/users/${userId}`);
