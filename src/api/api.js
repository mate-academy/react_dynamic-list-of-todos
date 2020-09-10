const API_URL = `https://mate-api.herokuapp.com/todos`;
const USERS_URL = `https://mate-api.herokuapp.com/users/`;

export async function getTodos() {
  const response = await fetch(API_URL);

  const result = await response.json();

  return result.data.filter(todo => todo.userId);
}

export async function getUsers(userId) {
  const response = await fetch(`${USERS_URL}/${userId}`);

  const result = await response.json();

  return result.data;
}
