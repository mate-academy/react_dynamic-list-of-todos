const BASE_URL = 'https://mate-api.herokuapp.com/';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status, response.text);
    }

    return response.json();
  });

export const getTodos = () => request('todos');
export const getUsers = userId => request(`users/${userId}`);
