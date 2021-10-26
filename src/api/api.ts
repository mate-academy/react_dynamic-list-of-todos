const apiUrl = 'https://mate.academy/students-api';

export function getUsers(id: number): Promise<User[]> {
  return fetch(`${apiUrl}/users/${id}`)
    .then(res => res.json());
}

export function getTodos(): Promise<Todo[]> {
  return fetch(`${apiUrl}/todos`)
    .then(res => res.json());
}
