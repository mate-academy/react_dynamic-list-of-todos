const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => (fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  })
);

export const getTodos = () => request('/todos');

export const getUser = async(userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};
