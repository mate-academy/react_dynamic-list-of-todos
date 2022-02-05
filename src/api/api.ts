const API_URL = 'https://mate.academy/students-api/';

const getData = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`);

  return response.json();
};

export const getTodos = (): Promise<Todo[]> => (
  getData('todos')
);

export const getUser = (userId: number): Promise<User> => (
  getData(`users/${userId}`)
);

export const getFilteredTodosByStatus = (completed: boolean): Promise<Todo[]> => (
  getData(`todos?completed=${completed}`)
);
