const TODO_API = 'https://mate-api.herokuapp.com/todos';
const USERS_API = 'https://mate-api.herokuapp.com/users';

export const getTodos = async() => {
  const todos = await (await fetch(TODO_API)).json();

  return todos.data;
};

export const getUsers = async(userId) => {
  const users = await (await fetch(`${USERS_API}/${userId}`)).json();

  return users.data;
};
