const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
};

export const getUser = async (userId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const user = await response.json();

    return user;
  } catch {
    return !Error;
  }
};
