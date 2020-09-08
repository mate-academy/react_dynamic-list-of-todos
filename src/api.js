const API_TODO_URL = 'https://mate-api.herokuapp.com/todos';

export const getTodos = () => (
  fetch(API_TODO_URL)
    .then(response => response.json())
);

export const getUser = (userId) => (
  fetch(`https://mate-api.herokuapp.com/users/${userId}`)
    .then(response => response.json())
);
