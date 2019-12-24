const URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';
const URL_USERS = 'https://jsonplaceholder.typicode.com/users';

export const getTodosFromServer = async() => {
  const response = await fetch(URL_TODOS);

  return response.json();
};

export const getUsersFromServer = async() => {
  const response = await fetch(URL_USERS);

  return response.json();
};
