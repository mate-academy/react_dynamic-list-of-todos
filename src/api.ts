const request = async (url:string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getTodos = () => {
  const url = 'https://mate.academy/students-api/todos';

  return request(url);
};

export const getUser = (userId: number) => {
  const url = `https://mate.academy/students-api/users/${userId}`;

  return request(url);
};
