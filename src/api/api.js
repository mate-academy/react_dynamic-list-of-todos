const BASE_URL = 'https://mate-api.herokuapp.com';

const request = endPoint => fetch(`${BASE_URL}${endPoint}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('404 (Not Found)');
    }

    if (!response.headers.get('content-type').includes('application/json')) {
      throw new Error('no compatible data');
    }

    return response.json();
  })
  .catch(error => error);

export const getTodosFromServer = () => request('/todos')
  .then(response => response);

export const getUserFromServer = userId => request(`/users/${userId}`)
  .then(response => response);
