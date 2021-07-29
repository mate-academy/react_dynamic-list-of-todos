
const todosApi = 'https://mate-api.herokuapp.com/todos';

export const getTodos = () => (
  fetch(todosApi)
    .then(item => item.json()));

export const getUsersById = userId => (
  fetch(`https://mate-api.herokuapp.com/users/${userId}`)
    .then(item => item.json()));
