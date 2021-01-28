const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result.data);

export const requestTodos = () => request('/todos');
export const requestUser = id => request(`/users/${id}`);
