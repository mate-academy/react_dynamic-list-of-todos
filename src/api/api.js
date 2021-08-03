const API_URL_TODOS = 'https://mate-api.herokuapp.com/todos';
const API_URL_USERS = 'https://mate-api.herokuapp.com/users/';

export const getTodosList = () => fetch(API_URL_TODOS)
  .then(response => response.json())
  .then(response => response.data.filter(
    item => item.userId <= 10 && item.userId !== null && item.title !== null,
  ).sort((a, b) => a.userId - b.userId));

export const getUsersList = userId => fetch(API_URL_USERS + userId)
  .then(response => response.json())
  .then(response => response.data);
