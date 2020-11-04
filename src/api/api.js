const API_TODO = `https://mate-api.herokuapp.com/todos`;
const API_USER = `https://mate-api.herokuapp.com/users/`;

export const getTodos = () => fetch(API_TODO).then((response) => {
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
});

export const getUser = id => (
  fetch(`${API_USER}${id}`).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  }));
