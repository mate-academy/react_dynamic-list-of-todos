import { User } from '../types/User';
import { getData } from '../Utils/UtilsClient';

export function getUser(useId: number): Promise<User> {
  return getData<User>(`/users/${useId}.json`);
}
