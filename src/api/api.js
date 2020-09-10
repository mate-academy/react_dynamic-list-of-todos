const url = 'https://mate-api.herokuapp.com';

export const getTodos = () => (
  fetch(`${url}/todos`)
    .then(response => response.json())
    .then(result => result.data)
    .then(todos => todos)
);

export const getUsers = () => (
  fetch(`${url}/users`)
    .then(response => response.json())
    .then(result => result.data)
    .then(users => users)
);
