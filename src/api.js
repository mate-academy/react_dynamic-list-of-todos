const API_TODOS = 'https://mate-api.herokuapp.com/todos';
const API_USERS = 'https://mate-api.herokuapp.com/users';

export const getTodos = async() => {
  const promise = await fetch(API_TODOS);

  return promise.json();
};

export const getUser = async(userId) => {
  const promise = await fetch(`${API_USERS}/${userId}`);

  return promise.json();
};
