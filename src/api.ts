const API_TODOS_URL = 'https://mate.academy/students-api/todos';
const API_USERS_URL = 'https://mate.academy/students-api/users/';

export const getTodos = async ():Promise<Todo[]> => {
  const response = await fetch(API_TODOS_URL);

  return response.json();
};

export const getUser = async (userId:number) => {
  const response = await fetch(`${API_USERS_URL}${userId}`);

  return response.json();
};
