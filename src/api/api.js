// eslint-disable-next-line no-unused-vars
const API_URL = `https://mate-api.herokuapp.com`;

export function request(url) {
  return fetch(`${API_URL}${url}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    })
    .then(result => result.data);
}

export const getAllTodos = () => request('/todos');
export const getUser = userId => request(`/users/${userId}`);
