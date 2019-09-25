const APITODOS_URl = 'https://jsonplaceholder.typicode.com/todos';

const getTodosFromServer = async() => {
  const todos = await fetch(APITODOS_URl);
  return todos.json();
};

export default getTodosFromServer;
