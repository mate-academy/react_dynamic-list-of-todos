export const BASE_URL = 'https://mate.academy/students-api';

export const getAllTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  const todos: Promise<Todo[]> = await response.json();

  return todos;
};

// export const getUser = async (endpoint: number) => {
//   const response = await fetch(`${BASE_URL}/users/${endpoint}`);
//   const data: Promise<User> = await response.json();

//   return data;

//   // setUser(await data);
// };
