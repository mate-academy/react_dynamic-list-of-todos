/* eslint-disable no-console */
const BASE_URL = 'https://mate.academy/students-api';

async function getUrl(endpoint: string) {
  const response = await fetch(BASE_URL + endpoint);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export const getTodos = () => (getUrl('/todos'));
export const getUser = (userId: number) => (getUrl(`/users/${userId}`));
