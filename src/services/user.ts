import { getData } from '../utils/httpClient';

export function getUsers(userId: number) {
  return getData(`/users/${userId}.json`).then(user => user.json());
}
