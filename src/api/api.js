const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

export const getTodos = async() => {
  const responce = await fetch(TODOS_URL);

  return responce.json();
};

export const getUser = userId => fetch(`${USERS_URL}/${userId}`)
  .then(responce => responce.json())
  .then(users => users.data);
