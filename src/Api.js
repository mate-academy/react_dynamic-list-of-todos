const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = url => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw (new Error('failed Data'));
    }

    return response.json();
  })
  .then(result => result.data);

export const getTodos = () => request('todos')
  .then(result => result.filter(todo => todo.title));

export const getUsers = () => request('users');
