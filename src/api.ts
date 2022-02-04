const todosUrl = 'https://mate.academy/students-api/todos';
const userTodosUrl = 'https://mate.academy/students-api/users/';

export const getTodos = (): Promise<Todo[]> => {
  return (
    fetch(todosUrl)
      .then(response => response.json())
  );
};

export const getUserDetails = (userId: number): Promise<User> => {
  return fetch(`${userTodosUrl}${userId}`)
    .then(response => response.json());
};
