const BASE_URL = `https://mate-api.herokuapp.com`;

const request = url => (fetch(`${BASE_URL}/${url}`)
  .then(response => response.json())
  .then(serverResponse => serverResponse.data || serverResponse));

export const getTodos = () => (
  request('todos')
    .then(todos => todos.filter(
      todo => (todo.title && todo.userId),
    ))
);

export const getUserById = userId => request(`users/${userId}`);
