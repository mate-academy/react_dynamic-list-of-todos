const URL_API = 'https://jsonplaceholder.typicode.com/todos';

export const todos = () => (
  fetch(URL_API).then(response => response.json())
);
