const API_URL = `https://mate-api.herokuapp.com`;

export const getAllTodos = async() => {
  const data = await fetch(`${API_URL}/todos`);
  const result = await data.json();

  return result.data;
};

export const getUser = async(userId) => {
  const user = await fetch(`${API_URL}/users/${userId}`);
  const result = await user.json();

  return result.data;
};
