const todosFromServer = 'https://mate-api.herokuapp.com/todos';
const usersFromServer = 'https://mate-api.herokuapp.com/users/';

export function getTodos() {
  return fetch(todosFromServer)
    .then(todo => todo.json());
}

export function getUser(userId) {
  return fetch(`${usersFromServer}${userId}`)
    .then(todo => todo.json());
}
