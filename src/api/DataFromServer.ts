export function getUsers(): Promise<User[]> {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(respone => respone.json());
}

export function getTodos(): Promise<Todo[]> {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(respone => respone.json());
}
