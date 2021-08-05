const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data || result);

export const getTodos = async() => {
  const todos = await request('/todos');

  return todos;
};

export const getUser = async(userId) => {
  const user = await request(`/users/${userId}`);

  return user;
};
