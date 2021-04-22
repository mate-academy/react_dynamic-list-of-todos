const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

const request = async(path, options) => {
  const response = await fetch(`${BASE_URL}${path}`, options);

  return response.json();
};

const getToken = () => request('/token');

export const getUsersFromPage = pageId => request(`/users?page=${pageId}`);

export const addUsers = async(user) => {
  const tokenFromServer = await getToken();

  return request(`/users`, {
    method: 'POST',
    headers: {
      Token: tokenFromServer.token,
    },
    body: user,
  });
};

export const getPositions = () => (
  request(`/positions`)
);
