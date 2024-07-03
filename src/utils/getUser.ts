import { User } from '../types/User';
import { getData } from './httpClient';

export function getUser(id: number): Promise<User> {
  return getData<User>(`/users/${id}.json`);
}
