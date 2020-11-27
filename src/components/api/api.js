// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com`;

export const getTodos = async() => {
  const todos = fetch(`${API_URL}/todos`)
    .then(promise => promise.json())
    .then(result => result.data);

  return todos;
};

export const getUser = async(userId) => {
  const user = fetch(`${API_URL}/users/${userId}`)
    .then(promise => promise.json())
    .then(result => result.data);

  return user;
};
