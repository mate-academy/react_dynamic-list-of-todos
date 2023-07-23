import { User } from '../types/User';
import { getData } from './httpClient';

export function getUsers(userId: number) {
  return getData<User[]>(`/users/${userId}.json`)
    .then(users => users);
}
