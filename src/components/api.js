const TODO_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export const getTodos = async() => {
  const response = await fetch(TODO_URL);

  return response.json()
    .then(result => result.data)
    .then(todos => todos.filter(todo => todo.title && todo.userId));
};

export const getUser = async(userId) => {
  const response = await fetch(`${USERS_URL}${userId}`);

  return response.json()
    .then(result => result.data);
};
