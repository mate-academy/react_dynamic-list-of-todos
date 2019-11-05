function loadUsers() {
  return fetching('https://jsonplaceholder.typicode.com/users');
}

function loadTodos() {
  return fetching('https://jsonplaceholder.typicode.com/todos');
}

function fetching(url) {
  return fetch(url)
    .then(response => response.json());
}

export { loadTodos, loadUsers };
