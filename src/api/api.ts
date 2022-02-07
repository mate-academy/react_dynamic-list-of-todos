const TODO_URL = 'https://mate.academy/students-api/todos';
const USERS_URL = 'https://mate.academy/students-api/users/';

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(TODO_URL);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const todos = await response.json();

    return todos;
  } catch (error) {
    throw new Error(`Error ocured because of this ${error}`);
  }
};

export const getUserById = async (id:number): Promise<User> => {
  const response = await fetch(`${USERS_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const user = await response.json();

  return user;
};
