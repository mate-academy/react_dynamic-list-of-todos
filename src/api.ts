const BASE_URL = 'https://mate.academy/students-api';

const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (id: number) => {
  return request(`/users/${id}`);
};
