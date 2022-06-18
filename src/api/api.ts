const url = 'https://mate.academy/students-api';

export const getTodo = async () => {
  const response = await fetch(`${url}/todos`);

  return response.json();
};

export const getUser = async (userId: number) => {
  const response = await fetch(`${url}/users/${userId}`);

  return response.json();
};
