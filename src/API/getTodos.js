const todosURL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodo = () => fetch(todosURL)
  .then(response => response.json());
