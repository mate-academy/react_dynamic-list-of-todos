const URL_TODO_LINK = 'https://mate.academy/students-api/todos';
const URL_USERS_LINK = 'https://mate.academy/students-api/users';

export const getTodos = async () => {
  const todos = await fetch(URL_TODO_LINK);

  return todos.json();
};

export const getUser = async (userId: number) => {
  const user = await fetch(`${URL_USERS_LINK}/${userId}`);

  return user.json();
};
