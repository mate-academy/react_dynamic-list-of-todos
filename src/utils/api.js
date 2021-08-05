const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error');
    }

    return res.json();
  })
  .then(response => response.data)
  .catch(() => []);

export const getTodos = () => request('/todos');

export const getUserById = userId => request(`/users/${userId}`);
