const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodosAndUsers = () => (
  Promise.all([fetch(USERS_URL), fetch(TODOS_URL)])
    .then(responses => (
      Promise.all(responses.map(response => response.json()))
    ))
);
