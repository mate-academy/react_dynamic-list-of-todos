export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    return res.json();
  })
  .then(res => res.data);

export const getTodos = () => request('/todos');
export const getUser = id => request(`/users/${id}`);
