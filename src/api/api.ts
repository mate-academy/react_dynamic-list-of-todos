const BASE_URL = 'https://mate.academy/students-api';

const makeRequest = async <T>(route = '/'): Promise<T> => {
  const res: Response = await fetch(BASE_URL + route);

  return res.json();
};

export const fetchTodos = (): Promise<Todo[]> => makeRequest('/todos');
export const fetchUserData = (id: number): Promise<User> => makeRequest(`/users/${id}`);
