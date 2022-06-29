const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = async () => {
  const result = await request('/todos');

  return result;
};

export const getUsers = async (userId: number) => {
  const result = await request(`/users/${userId}`);

  return result;
};
