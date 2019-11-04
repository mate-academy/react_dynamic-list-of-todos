const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getTodosWithUsers = async () => {
  const todos = await fetch(TODOS_URL)
    .then(response => response.json());
  const users = await fetch(USERS_URL)
    .then(response => response.json());

  return todos.map(todo => (
    {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }
  ));
};

export default getTodosWithUsers;
