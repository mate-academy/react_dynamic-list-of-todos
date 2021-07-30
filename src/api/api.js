const URL = 'https://mate-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${URL}/todos`);
  const result = await response.json();

  return result.data;
};

export const getUsers = async(userId) => {
  const response = await fetch(`${URL}/users/${userId}`);
  const result = await response.json();

  return result.data;
};
