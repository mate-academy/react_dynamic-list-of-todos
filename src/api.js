export const getTodos = () => (
  fetch('https://mate-api.herokuapp.com/todos')
    .then(response => response.json())
);

export const getUser = url => (
  fetch(`https://mate-api.herokuapp.com/users/${url}`)
    .then(response => response.json())
);
