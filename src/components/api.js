const API_TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const API_USER_URL = 'https://mate-api.herokuapp.com/users/';

export const getTodos = async() => {
  const response = await fetch(API_TODOS_URL);

  return response.json()
    .then(result => result.data);
};

export const getUser = async(userId) => {
  const response = await fetch(`${API_USER_URL}${userId}`);

  return response.json()
    .then(result => result.data);
};
