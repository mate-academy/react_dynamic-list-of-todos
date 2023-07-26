import { User } from '../types/User';
import { getData } from '../utils/httpClient';

export function getUser(userId: number) {
  return getData<User>(`/users/${userId}.json`);
}
