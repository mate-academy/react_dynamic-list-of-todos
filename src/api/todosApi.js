const URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = () => fetch(URL)
  .then(response => response.json());
