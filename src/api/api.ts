// eslint-disable-next-line
const URL = 'https://mate.academy/students-api/todos';
const URLusers = 'https://mate.academy/students-api/users';

async function request(urlEndPoint: string) {
  const result = await fetch(urlEndPoint);
  const data = await result.json();

  return data;
}

export function getAllTodos() {
  return request(URL);
}

export function getUser(userId: number) {
  return request(`${URLusers}/${userId}`);
}
