const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getTodos = () => (
  fetch(TODOS_URL)
    .then(response => response.json())
);

const getUsers = () => (
  fetch(USERS_URL)
    .then(response => response.json())
);

const getTodosWithUsers = async() => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => (
    {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }
  ));
};

export default getTodosWithUsers;
