const API_URL = 'https://mate-api.herokuapp.com';

const requestToTheServer = url => (
  fetch(`${API_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
);

export const getTodos = () => requestToTheServer('/todos')
  .then(response => response.data);

export const getUser = userId => requestToTheServer(`/users/${userId}`)
  .then(response => response.data);
