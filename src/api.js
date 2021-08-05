const API_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${API_URL}${url}`)
  .then((result) => {
    if (!result.ok) {
      throw new Error(`${result.status} - ${result.statusText}`);
    }

    return result.json();
  });

export const getTodos = () => request('/todos');

export const getUser = userId => request(`/users/${userId}`);
