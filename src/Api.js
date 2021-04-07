const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = url => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw (new Error('failed Data'));
    }

    return response.json();
  })
  .then(result => result.data)
  .then((result) => {
    if (url === 'todos') {
      return result.filter(item => item.title);
    }

    return result;
  });

export const getTodos = request('todos');

export const getUsers = request('users');
