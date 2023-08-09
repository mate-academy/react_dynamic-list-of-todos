import { User } from '../types/User';
import { getData } from './httpClients';

export function getUsers(id: number) {
  return getData<User>(`users/${id}.json`);
}
