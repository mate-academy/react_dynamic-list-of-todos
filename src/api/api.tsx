/* eslint-disable no-console */
const API_URL = 'https://mate.academy/students-api';

// export const getAllTodos = (): Promise<Todo[]> => {
//   return fetch(`${API_URL}/todos`)
//     .then(res => res.json());
// };

export async function getAllTodos():Promise<Todo[]> {
  return (
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
  );
}

export async function getUsers(id: number):Promise<User> {
  return (
    fetch(`${API_URL}/users/${id}`)
      .then(res => res.json())
  );
}
