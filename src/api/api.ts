// eslint-disable-next-line
const todosUrl = `https://mate.academy/students-api/todos`;
const usersUrl = 'https://mate.academy/students-api/users';

function request(url: string) {
  return fetch(url)
    .then(response => response.json());
}

export const getToods = request(todosUrl);

export function getUser(id: number) {
  return request(`${usersUrl}/${id}`);
}
