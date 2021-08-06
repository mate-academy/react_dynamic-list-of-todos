const BASE_URL = `https://mate-api.herokuapp.com`;

export function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
}

export const getUsers = () => request('/todos')
  .then(todos => todos.data.filter(todo => todo.userId && todo.title));
export const getTodos = id => request(`/users/${id}`);
