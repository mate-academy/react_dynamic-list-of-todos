const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

export const getTodosFromServer = () => (
  fetch(TODOS_URL).then(response => response.json()).then(obj => obj.data)
);

export const getUserFromServer = userId => (
  fetch(`${USERS_URL}/${userId}`)
    .then(response => response.json()).then(obj => obj.data)
);
