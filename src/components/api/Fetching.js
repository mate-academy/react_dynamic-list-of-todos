import React from 'react';

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
}

function fetchTodos() {
  const todos = fetchData(todosUrl);
  return todos;
}

function fetchUsers() {
  const users = fetchData(usersUrl);
  return users;
}

export { fetchTodos, fetchUsers };
