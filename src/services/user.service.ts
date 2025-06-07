import { User } from '../types/User';

export function getUser(id: number): Promise<User> {
  return fetch('/api/users/' + id + '.json')
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then(user => user);
}
