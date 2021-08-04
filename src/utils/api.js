const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error');
    }

    return res.json();
  })
  .catch(() => []);

export const getTodos = () => request('/todos')
  .then(response => response.data);

export const getUser = userId => request(`/users/${userId}`)
  .then(response => response.data);
