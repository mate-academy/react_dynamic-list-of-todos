export const todosPromise = () => fetch(
  'https://jsonplaceholder.typicode.com/todos'
).then(
  response => response.json()
);
