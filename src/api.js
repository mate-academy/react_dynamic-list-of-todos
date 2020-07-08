const URLTodos = 'https://mate.academy/students-api/todos';
const URLUsers = 'https://mate.academy/students-api/users';

export const getTodos = async () => {
  const tempData = await fetch(URLTodos)
    .then(response => response.json());

  return tempData.data;
};

export const getUsers = async () => {
  const tempData = await fetch(URLUsers)
    .then(response => response.json());

  return tempData.data;
};
