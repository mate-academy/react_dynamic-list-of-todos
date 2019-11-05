const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

async function loadData(url) {
  return fetch(url).then(response => response.json());
}

const getTodosWithUsers = async () => {
  const todos = await loadData(TODOS_URL);
  const users = await loadData(USERS_URL);

  return todos.map(todo => (
    {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }
  ));
};

export default getTodosWithUsers;
