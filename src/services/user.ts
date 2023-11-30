import { get } from '../api';
import { User } from '../types/User';

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
