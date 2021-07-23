const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = endpoint => fetch(`${BASE_URL}${endpoint}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });

export const getAllTodos = () => request('/todos');

export const getUserById = userId => request(`/users/${userId}`);
