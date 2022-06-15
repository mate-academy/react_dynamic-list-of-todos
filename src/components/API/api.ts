const BASE_URL = 'https://mate.academy/students-api';

export function request(url : string) {
  return fetch(`${BASE_URL}${url}`)
    .then(res => res.json());
}

export async function getTodos() {
  const result = await (request('/todos'));

  return result;
}

export async function getUsers() {
  const result = await (request('/users'));

  return result;
}

export async function getSingleUser(id:number) {
  const result = await (request(`/users/${id}`));

  return result;
}
