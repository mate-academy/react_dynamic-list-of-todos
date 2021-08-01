// eslint-disable-next-line
const API_URL = 'https://mate-api.herokuapp.com';

export const getAll = async() => {
  const response = await fetch(`${API_URL}/todos`);
  const todos = await response.json();

  return todos.data;
};

export const getUser = async(userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const user = await response.json();

  return user.data;
};
