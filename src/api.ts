export const getTodos = () => {
  const URL = 'https://mate.academy/students-api/todos';

  return fetch(URL)
    .then(response => response.json());
};

export const getUser = (userId: number) => {
  const URL = `https://mate.academy/students-api/users/${userId}`;

  return fetch(URL)
    .then(response => response.json());
};
