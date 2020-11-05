const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    return res.json();
  })
  .then(result => result.data);

export const getTodos = () => request('/todos')
  .then(result => result.filter(
    todo => todo.title && todo.id && todo.userId,
  ));

export const getUser = userId => request(`/users/${userId}`);
