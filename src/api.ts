// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export async function getTodos() {
  await wait(1000);
  const response = await fetch(`${BASE_URL}/todos.json`);
  const todos = response.json();

  return todos;
}

export async function getUser(userId: number) {
  await wait(1000);
  const response = await fetch(`${BASE_URL}/users/${userId}.json`);
  const todos = response.json();

  return todos;
}
