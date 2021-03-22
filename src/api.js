import { request } from './helpers';

const BASE_URL = 'https://mate-api.herokuapp.com';

export function loadTodos() {
  return request(`${BASE_URL}/todos`)
    .then(response => response.data.filter((todo) => {
      if (Object.values(todo)
        .some(field => field === null || field === '')) {
        return false;
      }

      return todo;
    }))
    .then(response => response);
}

export function loadUser(userId) {
  return request(`${BASE_URL}/users/${userId}`);
}
