const getTodos = async() => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const response = await fetch(url);
  const todos = await response.json();

  return todos;
};

export default getTodos;
