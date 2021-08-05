const API_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${API_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result.data);

export const getTodos = () => request('/todos');

export const getUserData = userId => request(`/users/${userId}`);
