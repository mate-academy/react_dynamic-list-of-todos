export default async() => {
  const url = 'https://jsonplaceholder.typicode.com/';

  const resUsers = await fetch(`${url}users`);
  const users = await resUsers.json();

  const resTodos = await fetch(`${url}todos`);
  const todos = await resTodos.json();

  const todosWithUser = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

  return todosWithUser;
};
