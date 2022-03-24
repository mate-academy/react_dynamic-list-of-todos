const BASE_URL = 'https://mate.academy/students-api/';

function request(endpoint: string) {
  return (
    fetch(`${BASE_URL}${endpoint}`).then((response) => response.json())
  );
}

export function getTodos() {
  return (
    request('/todos')
  );
}

export function getUser(userId: number) {
  const endPoint = `/users/${userId}`;

  return (
    request(endPoint)
  );
}
