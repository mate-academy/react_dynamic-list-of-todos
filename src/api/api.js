const baseUrl = 'https://mate-api.herokuapp.com';

export function request(url) {
  return fetch(`${baseUrl}${url}`)
    .then(response => response.json());
}

export const getTodos = () => request('/todos');
export const getUser = userId => request(`/users/${userId}`);
