import { User } from '../types/User';
import { getData } from './httpClient';

export const getToUsers = (id: number) => {
  return getData<User>(`/users/${id}.json`).then(users => users);
};
