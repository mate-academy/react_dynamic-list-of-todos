import { User } from '../types/User';
import { getData } from '../utils/httpClent';

export function getUsers() {
  return getData<User[]>('/users').then(users => users);
}
