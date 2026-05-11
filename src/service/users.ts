import { getData } from '../api';
import { User } from '../types/User';

export const getUser = (userId: number) => getData<User>(`/users/${userId}`);
