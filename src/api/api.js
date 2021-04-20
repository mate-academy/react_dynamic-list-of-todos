const BASE_URL = 'https://mate-api.herokuapp.com';

const request = async(path, options) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options);
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log(error.message);

    return null;
  }
};

export const getTodos = () => request('/todos');

export const getUser = userId => request(`/users/${userId}`);

export const deleteTodo = todoId => (
  request(`/todos/${todoId}`, {
    method: 'DELETE',
  })
);

export const addTodo = (userId, title) => (
  request(`/todos`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
  })
);
