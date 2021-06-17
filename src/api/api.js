const API_URL = 'https://mate-api.herokuapp.com';

export const getTodos = () => (
  fetch(`${API_URL}/todos/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
);

export const getUser = id => (
  fetch(`${API_URL}/users/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
);
