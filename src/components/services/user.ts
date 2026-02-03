// export function getUsers() {
//   return fetch('http://localhost:5174/api/users.json').then(response => {
//     if (!response.ok) {
//     }

//     return response.json();
//   });
// }

import { User } from '../../types/User';

export function getUser(userId: number): Promise<User> {
  return fetch(
    `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
  ).then(response => response.json());
}
