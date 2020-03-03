export function getUsersFromServer(): Promise<User[]> {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(respone => respone.json());
}
