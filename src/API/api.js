const BASE__URL = 'https://mate-api.herokuapp.com/';

const request = url => fetch(`${BASE__URL}${url}`)
  .then((result) => {
    if (!result.ok) {
      throw new Error(`${result.status}`);
    }

    return result.json();
  });

export const getTodos = () => request('todos')
  .then(response => response.data);

export const getUser = userId => request(`users/${userId}`)
  .then(response => response.data);
