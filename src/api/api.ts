function request(endpoint: string) {
  return fetch(`https://mate.academy/students-api/${endpoint}`)
    .then(response => response.json());
}

export function getTodos(): Promise<Todo[]> {
  return request('todos');
}

export function getUser(userId: number): Promise<User> {
  return request(`users/${userId}`);
}
