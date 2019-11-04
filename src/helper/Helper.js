function fetching(url) {
  return fetch(url)
    .then(response => response.json());
}

const users = fetching('https://jsonplaceholder.typicode.com/users');
const todos = fetching('https://jsonplaceholder.typicode.com/todos');

export { users, todos };
