const getTodos = async() => {
  const url = 'https://jsonplaceholder.typicode.com/todos';

  return fetch(url)
    .then(response => response.json());
};

const getUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  return fetch(url)
    .then(response => response.json());
};

const getData = async() => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

export default getData;
