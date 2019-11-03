const URL = 'https://jsonplaceholder.typicode.com/todos';

export async function getTodos() {
  return fetch(URL)
    .then(response => response.json());
}
