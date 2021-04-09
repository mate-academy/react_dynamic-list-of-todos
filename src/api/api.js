export const getAllTodos = () => (
  fetch('https://mate-api.herokuapp.com/todos')
    .then(response => response.json())
    .then(result => result.data)
    .then(data => data.filter(todo => todo.title))
);

export const getUserById = userId => (
  fetch(`https://mate-api.herokuapp.com/users/${userId}`)
    .then(response => response.json())
    .then(result => result.data)
);
