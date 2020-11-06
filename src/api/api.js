const TODOS_URL = 'https://mate-api.herokuapp.com/todos/';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export const getAllTodos = () => fetch(TODOS_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then(todos => todos.data);

export const getUser = id => fetch(`${USERS_URL}${id}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then(user => user.data);
