// eslint-disable-next-line @typescript-eslint/naming-convention
const URL_Users = 'https://mate.academy/students-api/users';
// eslint-disable-next-line @typescript-eslint/naming-convention
const URL_Todos = 'https://mate.academy/students-api/todos';

export const getTodos = () => {
  return fetch(URL_Todos)
    .then(response => response.json());
};

export const getUsersId = () => {
  return fetch(URL_Users)
    .then(response => response.json());
};
