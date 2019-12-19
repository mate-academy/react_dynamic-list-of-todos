const URL = 'https://jsonplaceholder.typicode.com/todos';
const getTodos = () => fetch(URL)
  .then(response => response.json());

export default getTodos;
