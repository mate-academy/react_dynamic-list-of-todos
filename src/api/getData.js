export const getData = async(url) => {
  const responseTodos = await fetch(`${url}/todos`);
  const todos = await responseTodos.json();

  const responseUsers = await fetch(`${url}/users`);
  const users = await responseUsers.json();

  const data = todos.map(todo => ({
    ...todo,
    user: users.find(user => (user.id === todo.userId)),
  }));

  return data;
};
