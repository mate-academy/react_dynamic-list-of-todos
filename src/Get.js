const getFromServer = async() => {
  const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  const responseTodos = await fetch(todosUrl);
  const todos = await responseTodos.json();

  const usersUrl = 'https://jsonplaceholder.typicode.com/users';
  const responseUsers = await fetch(usersUrl);
  const users = await responseUsers.json();

  const userWithTodo = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  })
  );
  return userWithTodo;
};

export default getFromServer;
