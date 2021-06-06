
const API_URL = `https://mate-api.herokuapp.com`;

const request = url => fetch(`${API_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });

export const getTodos = () => request('/todos/');

export const getUser = userId => request(`/users/${userId}`);
