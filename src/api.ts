const API_URL = 'https://mate.academy/students-api/';

const request = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`);

  return response.json();
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};
