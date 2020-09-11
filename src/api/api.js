const API_URL = `https://mate-api.herokuapp.com`;

export const getTodos = () => (
  fetch(`${API_URL}/todos/`)
    .then(response => response.json())
);

export const getUser = userId => (
  fetch(`${API_URL}/users/${userId}/`)
    .then(response => response.json())
);
