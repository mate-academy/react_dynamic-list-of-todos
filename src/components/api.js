const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}/${url}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });

export const getUsers = () => request('users')
  .then(response => response.data);

export async function getTodos() {
  const users = await getUsers();
  const todos = await getAllTodos();
  const filteredTodos = todos.filter(todo => todo.title && (
    todo.userId && todo.userId <= users.length && todo.userId !== 0));

  return filteredTodos;
}

const getAllTodos = () => request('todos')
  .then(response => response.data);

export const getUser = userId => request(`users/${userId}`)
  .then(response => response.data);
