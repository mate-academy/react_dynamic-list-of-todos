import { User } from '../types/User';
import { getData } from '../utils/getData';

export function getUserByID(userID: number) {
  return getData<User>(`users/${userID}.json`);
}
