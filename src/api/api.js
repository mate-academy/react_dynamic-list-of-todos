export const getTodosList = () => fetch('https://mate-api.herokuapp.com/todos')
  .then(response => response.json());
