import { User } from '../types/User';
import { getData } from '../utils/httpClent';

export function getUsers() {
  return getData<User[]>('/users.json').then(users => users);
}
