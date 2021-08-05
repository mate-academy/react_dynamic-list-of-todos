// eslint-disable-next-line
const API_URL = 'https://mate-api.herokuapp.com';

export const getUsers = async(req) => {
  const response = await fetch(`${API_URL}${req}`);
  const todos = await response.json();

  return todos.data;
};
