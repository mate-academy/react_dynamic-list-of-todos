import { User } from '../types/User';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function getUsers(userId: number): Promise<User> {
  return delay(1000).then(() =>
    fetch(
      `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
    ).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }),
  );
}
