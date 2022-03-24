const BASE_URL = 'https://mate.academy/students-api';

export const getData = async (endpoint: string, id: number | string) => {
  const url = BASE_URL + endpoint + id;
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Error: ${data.status}`);
  }

  return data.json();
};

export const getTodos = async () => getData('/todos', '');

export const getUser = async (id: number) => getData('/users', `/${id}`);
