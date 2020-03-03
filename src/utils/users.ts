import { USERS_URL } from '../constants/api';
import { loadData } from './api';
import { User } from '../constants/types';

export const loadUsers = (): Promise<User[]> => {
  return loadData(USERS_URL);
};
