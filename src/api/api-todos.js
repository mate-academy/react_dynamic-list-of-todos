function getAllUsers(url) {
  return fetch(url)
    .then(response => response.json());
}

const users = getAllUsers('https://jsonplaceholder.typicode.com/users');
const todos = getAllUsers('https://jsonplaceholder.typicode.com/todos');

export { users, todos };
