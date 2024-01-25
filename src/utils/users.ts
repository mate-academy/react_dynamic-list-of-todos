import { User } from '../types/User';
import { getData } from './httpClients';

const USERS_URL = '/users/';

export function getUser(userId: number) {
  return getData<User>(`${USERS_URL}${userId}.json`);
}
