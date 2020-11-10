// eslint-disable-next-line
const BASE_URL = `https://mate-api.herokuapp.com`;

const request = url => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result.data);

export const getTodos = () => request('/todos');
export const getUser = userId => request(`/users/${userId}`);
