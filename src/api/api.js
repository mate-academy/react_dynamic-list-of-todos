const BASE_TODO_URL = 'https://mate-api.herokuapp.com/todos';
const BASE_USER_URL = 'https://mate-api.herokuapp.com/users/';

export async function getTodos() {
  const todos = await fetch(BASE_TODO_URL);

  return todos.json();
}

export async function getUser(userId) {
  const user = await fetch(`${BASE_USER_URL}/${userId}`);

  return user.json();
}
