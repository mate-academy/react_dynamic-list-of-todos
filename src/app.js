
const todosApi = 'https://mate-api.herokuapp.com/todos';

export const TodosFromServer = () => (
  fetch(todosApi)
    .then(item => item.json()));

export const UsersFromServer = userId => (
  fetch(`https://mate-api.herokuapp.com/users/${userId}`)
    .then(item => item.json()));
