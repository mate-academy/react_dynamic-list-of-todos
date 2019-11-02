const baseURL = 'https://jsonplaceholder.typicode.com';

const getResponse = async (url) => {
  const response = await fetch(url);

  return response.json();
};

export const getUsers = async () => {
  return await getResponse(`${baseURL}/users`);
};

export const getTodos = async () => {
  return await getResponse(`${baseURL}/todos`);
};
