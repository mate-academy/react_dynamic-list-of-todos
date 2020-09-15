const API_URL = `https://mate-api.herokuapp.com`;

export const getAllTodos = () => fetch(`${API_URL}/todos`)
  .then(response => response.json())
  .then(response => response.data);

export const getUserById = id => fetch(`${API_URL}/users/${id}`)
  .then(response => response.json())
  .then(response => response.data);
