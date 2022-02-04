const BASE_URL_TODOS = 'https://mate.academy/students-api/todos';

export function request(): Promise<Todo[]> {
  return fetch(BASE_URL_TODOS)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
}

export const getUser = (userId: number): Promise<User> => {
  const BASE_URL_USERS = `https://mate.academy/students-api/users/${userId}`;

  return fetch(BASE_URL_USERS)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};
