const API_URL = 'https://mate.academy/students-api';

const request = async <T>(endpoint = ''): Promise<T> => {
  const res: Response = await fetch(`${API_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }

  return res.json();
};

export const getTodos = (): Promise<Todo[]> => request('/todos');
export const getUser = (id: number): Promise<User> => request(`/users/${id}`);
