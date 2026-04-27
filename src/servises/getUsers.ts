//.. getUsers.ts
import type { User } from '../types/User';
import { wait } from './wait';

export function getUsers(): Promise<User[]> {
  const USERS_LIST =
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json';

  return wait()
    .then(() => fetch(USERS_LIST))
    .then(response => {
      if (!response.ok) {
        throw new Error('Opps  !!!');
      }

      return response.json();
    });
}
