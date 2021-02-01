const TODOS_URL = 'https://mate-api.herokuapp.com/todos/';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export async function getTodos() {
  const response = await fetch(`${TODOS_URL}`);
  const result = await response.json();

  return result.data;
}

export async function getUser(userId) {
  const response = await fetch(`${USERS_URL}${userId}`);
  const result = await response.json();

  return result.data;
}
