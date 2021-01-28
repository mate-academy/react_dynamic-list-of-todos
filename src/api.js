const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    return res.json();
  });

export const getTodos = () => request('/todos');

export const getUserDatas = async(userId) => {
  const getUsersFromServer = await fetch(`${BASE_URL}/users/${userId}`);

  return getUsersFromServer.json();
};
