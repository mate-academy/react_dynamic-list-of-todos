const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export async function getTodos() {
  const todos = await fetch(TODOS_URL);

  return todos.json();
}

export async function getUser(id) {
  const user = await fetch(USERS_URL + id);

  return user.json();
}
