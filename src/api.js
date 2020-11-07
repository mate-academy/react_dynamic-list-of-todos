const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}-${response.statusText}`);
    }

    return response.json();
  });

export const getTodos = () => request('/todos')
  .then(result => result.data);

export const getUser = id => request(`/users/${id}`)
  .then(result => result.data);
