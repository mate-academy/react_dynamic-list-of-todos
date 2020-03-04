export function getTodos(): Promise<Todo[]> {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(respone => respone.json());
}
