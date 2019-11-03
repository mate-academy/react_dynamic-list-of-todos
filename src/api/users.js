const URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers() {
  return fetch(URL)
    .then(response => response.json());
}
