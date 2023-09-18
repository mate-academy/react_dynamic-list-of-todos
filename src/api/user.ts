import { User } from '../types/User';

const API_URL
  = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/';

export function getUserById(userId: number): Promise<User> {
  return fetch(`${API_URL + userId}.json`)
    .then(responce => {
      return responce.json();
    });
}
