const URL = `https://mate-api.herokuapp.com`;

export const getTodos = async() => {
  const response = await fetch(`${URL}/todos/`);

  return response.json();
};

export const getUser = async(id) => {
  const data = await fetch(`${URL}/users/${id}`);

  return data.json();
};
