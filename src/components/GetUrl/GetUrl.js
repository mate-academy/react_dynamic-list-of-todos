import React from 'react';

function GetUrl(url) {
  return fetch(url)
    .then(response => response.json());
}

const users = GetUrl('https://jsonplaceholder.typicode.com/users');
const todos = GetUrl('https://jsonplaceholder.typicode.com/todos');

export {users, todos};
