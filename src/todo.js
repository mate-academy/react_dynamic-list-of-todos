const URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = () => fetch(URL)
  .then(responce => responce.json());
