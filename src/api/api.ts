const todosUrl = 'https://mate.academy/students-api/todos';
const usersUrl = 'https://mate.academy/students-api/users/';

export const getTodos = (): Promise<Todo[]> => {
  return (fetch(todosUrl).then(response => response.json()));
};

export const getUsers = (userId: number): Promise<User> => {
  return fetch(`${usersUrl}${userId}`).then(response => response.json());
};
