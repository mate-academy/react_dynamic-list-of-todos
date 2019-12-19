const todos = () => {
  const URL = 'https://jsonplaceholder.typicode.com/todos';

  return fetch(URL)
    .then(todolist => todolist.json());
};

export default todos;
