export function getAll(): Promise<Todo[]> {
  return fetch('https://mate.academy/students-api/todos')
    .then(response => response.json());
}

export function getUserById(id: number): Promise<User> {
  return fetch(`https://mate.academy/students-api/users/${id}`)
    .then(response => response.json());
}
