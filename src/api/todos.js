const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(
  !options ? `${BASE_URL}${url}` : `${BASE_URL}${url}${options}`,
)
  .then(result => result.json())
  .then(result => result.data);

export function getTodos() {
  return request('/todos');
}
