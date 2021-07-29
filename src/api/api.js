const URL = 'https://mate-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${URL}/todos`);
  const data = await response.json();

  return data.data;
};

export const getUsers = async(userId) => {
  const response = await fetch(`${URL}/users/${userId}`);
  const data = await response.json();

  return data.data;
};
