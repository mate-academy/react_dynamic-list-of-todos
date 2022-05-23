export const API_URL = 'https://mate.academy/students-api/todos';
export const USERS_URL = 'https://mate.academy/students-api/users';

export const request = async (url: string, endpoint: string) => {
  const response = await fetch(`${url}${endpoint}`);

  return response.json();
};

export const getData = () => request(API_URL, '');
export const getUsers = (id: string) => request(USERS_URL, id);
