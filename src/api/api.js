const BASE_URL = 'https://mate-api.herokuapp.com';

const request = async(endPoint) => {
  const response = await fetch(`${BASE_URL}${endPoint}`);

  if (response.ok) {
    return response.json();
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export const getTodos = () => request('/todos');

export const getUser = userId => request(`/users/${userId}`);
