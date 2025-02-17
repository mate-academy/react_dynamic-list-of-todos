import { User } from '../types/User';
import { getData } from '../utils/httpClient';

export function getTodoUser(userId: number) {
  return getData<User[]>('/users.json').then(users =>
    users.find(user => user.id === userId),
  );
}
