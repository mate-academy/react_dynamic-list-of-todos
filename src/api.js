const BASE_URL = 'https://mate-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${BASE_URL}/todos`);
  const todos = await response.json();

  return todos.data;
};

export const getUsers = async(idUser) => {
  const response = await fetch(`${BASE_URL}/users/${idUser}`);
  const users = await response.json();

  return users.data;
};
