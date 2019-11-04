function getUrl(url) {
  return fetch(url)
    .then(response => response.json());
}

const users = getUrl('https://jsonplaceholder.typicode.com/users');
const todos = getUrl('https://jsonplaceholder.typicode.com/todos');

export { users, todos };
