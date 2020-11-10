const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => (
  fetch(`${BASE_URL}${url}`)
    .then((result) => {
      if (!result.ok) {
        throw new Error(`${result.status} - ${result.statusText}`);
      }

      return result.json();
    })
    .then(result => result.data)
);

export function getTodos() {
  return request('/todos');
}

export function getUser(userId) {
  return request(`/users/${userId}`);
}
