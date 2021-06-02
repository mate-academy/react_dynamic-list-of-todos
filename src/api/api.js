const API_URL = `https://mate-api.herokuapp.com`;

export const getTodos = () => (
  fetch(`${API_URL}/todos`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

export const getUser = id => (
  fetch(`${API_URL}/users/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
);
