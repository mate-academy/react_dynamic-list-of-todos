const API_URL = 'https://mate.academy/students-api/todos';
const USER_URL = 'https://mate.academy/students-api/users/';

export function getAllTodo(): Promise<Todo[]> {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - list not found`);
      }

      return response.json();
    });
}

export function getUserDetail(userId: number): Promise<User> {
  return fetch(`${USER_URL}${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - user not found`);
      }

      return response.json();
    });
}
