const API_TODOS_URL = `https://mate-api.herokuapp.com/todos`;
const API_USERS_URL = `https://mate-api.herokuapp.com/users`;

export const getTodos = () => (
  fetch(API_TODOS_URL)
    .then(response => response.json())
    .then(result => result.data)
);

export const getUser = userId => fetch(`${API_USERS_URL}/${userId}`)
  .then(response => response.json())
  .then(result => result.data);
