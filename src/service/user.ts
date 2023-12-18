import { getData } from '../utils/httpClients';
import { User } from '../types/User';

export function getUserDetail() {
  return getData<User[]>('/users.json');
}
