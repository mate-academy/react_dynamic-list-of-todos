const GET_API = 'https://mate-api.herokuapp.com';

export async function getUsersFromServer() {
  const responce = await (fetch(`${GET_API}/users/`));
  const result = await responce.json();
  const users = await result.data;

  return users;
}

export async function getTodosFromServer() {
  const responce = await (fetch(`${GET_API}/todos/`));
  const result = await responce.json();
  const todos = await result.data;
  const filterTodosByUserId = todos
    .filter(todo => todo.userId !== null)
    .sort((curr, next) => curr.userId - next.userId);

  return filterTodosByUserId;
}

export async function getUserIdFromServer(userId) {
  const responce = await (fetch(`${GET_API}/users/${userId}`));
  const result = await responce.json();
  const USER_ID = await result.data;

  return USER_ID;
}

export async function getTodosByTitle(currentValue) {
  const responce = await (fetch(`${GET_API}/todos/`));
  const result = await responce.json();
  const getData = await result.data;

  return getData
    .filter(data => data.title.includes(currentValue.toLowerCase()));
}
