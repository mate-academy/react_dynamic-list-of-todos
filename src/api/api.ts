const API_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getTodos = () => request('/todos');
export const getUser = (id: number) => request(`/users/${id}`);
