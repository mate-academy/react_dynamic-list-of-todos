const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(responce => responce.json());
};

export function getTodos() {
  return request('/todos');
}

export function getUser(userId: number) {
  return request(`/users/${userId}`);
}
