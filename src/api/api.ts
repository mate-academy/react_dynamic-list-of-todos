const BASE_URL = 'https://mate.academy/students-api';

export function GetTodo(): Promise<Todo[]> {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
}

export const loadUser = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};
