const apiUrlTodos = 'https://mate.academy/students-api/todos';
const apiUrlUsers = 'https://mate.academy/students-api/users';

export const getTodos = ():Promise<Todo[]> => {
  return fetch(apiUrlTodos)
    .then(response => response.json());
};

export const getUsers = (selectedUserId: number):Promise<User> => {
  return fetch(`${apiUrlUsers}/${selectedUserId}`)
    .then(response => response.json());
};
