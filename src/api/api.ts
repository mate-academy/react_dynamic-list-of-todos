const API_URL = 'https://mate.academy/students-api/';

function request(url: string, errorMessage: string) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${errorMessage}`);
      }

      return response.json();
    });
}

export function getAllTodo(): Promise<Todo[]> {
  return request(`${API_URL}todos`, 'list not found');
}

export function getUserDetail(userId: number): Promise<User> {
  return request(`${API_URL}users/${userId}`, 'user not found');
}
