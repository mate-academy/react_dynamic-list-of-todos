const URL = 'https://mate-api.herokuapp.com';

const request = async(path) => {
  try {
    const response = await fetch(`${URL}${path}`);
    const data = response.json();

    return data;
  } catch (error) {
    throw new Error('Whoops!');
  }
};

export const getTodos = async() => {
  const data = await request('/todos');

  return data;
};

export const getUsers = async(userId) => {
  const data = await request(`/users/${userId}`);

  return data;
};
