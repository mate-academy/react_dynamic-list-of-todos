const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USER_URL = `https://mate-api.herokuapp.com/users/`;

export const getDataFromServer = url => fetch(url)
  .then(response => response.json())
  .then(serverResponse => serverResponse.data);

export const getTodos = getDataFromServer(TODOS_URL);
export const getUser = userId => getDataFromServer(`${USER_URL}${userId}`);
