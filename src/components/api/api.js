// eslint-disable-next-line
const API_URL = 'https://mate-api.herokuapp.com';

export const getFromUrl = async(url) => {
  const response = await fetch(`${API_URL}${url}`);
  const responseFromServer = await response.json();

  return responseFromServer.data || responseFromServer;
};

export const getTodos = () => getFromUrl('/todos');

export const getUsers = userId => getFromUrl(`/users/${userId}`);
