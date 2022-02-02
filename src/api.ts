const todosUrl = 'https://mate.academy/students-api/todos';
const usersUrl = 'https://mate.academy/students-api/users/';

export async function getTodos() {
  const result = await fetch(todosUrl);

  return result.json();
}

export async function getUser(userId: number) {
  const result = await fetch(`${usersUrl}${userId}`);

  return result.json();
}
