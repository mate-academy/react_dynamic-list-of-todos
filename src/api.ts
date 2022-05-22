const API_URL = 'https://mate.academy/students-api';

export function getAllTodos(url: string): Promise<Todo[]> {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
}

export function getUser(url: string): Promise<User> {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
}
