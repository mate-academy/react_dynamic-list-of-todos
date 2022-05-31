// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api/todos`;

export async function getTodo(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  const todos = await response.json();

  return todos;
}

export async function getUser(API_USER_URL:string) {
  const response = await fetch(API_USER_URL);

  const user = await response.json();

  return user;
}
