const API_URL = `https://mate-api.herokuapp.com/`;

export const getAll = async() => {
  const response = await fetch(`${API_URL}todos`);

  return response.json();
};

export const getUser = async(userId) => {
  const response = await fetch(`${API_URL}users/${userId}`);
  const data = response.json();

  return data;
};
