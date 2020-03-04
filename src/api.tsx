const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

export const getUsers = () => {
  const users = fetch(usersUrl)
    .then(response => response.json());

  return users;
};

export const getTodos = () => {
  const todos = fetch(todosUrl)
    .then(response => response.json());

  return todos;
};
