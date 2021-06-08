const TodosURL = 'https://mate-api.herokuapp.com/todos';
const UsersURL = 'https://mate-api.herokuapp.com/users';

export const getTodos = title => fetch(`${TodosURL}/${title}`)
  .then(response => response.json())
  .then(result => result.data);

export const getUser = userId => fetch(`${UsersURL}/${userId}`)
  .then(response => response.json())
  .then(result => result.data);
