const BASE_URL = 'https://mate.academy/students-api/';

export function getTodos() {
  return (
    fetch(`${BASE_URL}/todos`).then((response) => response.json())
  );
}

export function getUser(userId: number) {
  return (
    fetch(`${BASE_URL}/users/${userId}`).then((response) => response.json())
  );
}
