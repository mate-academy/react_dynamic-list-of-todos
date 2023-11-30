import { get } from './index';
import { User } from '../types/User';

export async function getUser(userId: number) {
  return get<User>(`/users/${userId}`);
}
