const BASE_URL = 'https://mate-api.herokuapp.com';

// eslint-disable-next-line
const getData = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .then(response => response.data);
};

export const getTodos = () => getData('/todos');
export const getUser = id => getData(`/users/${id}`);
