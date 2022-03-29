const BASE_URL = 'https://mate.academy/students-api';

const request = (endpoint: string) => {
  return (
    fetch(`${BASE_URL}${endpoint}`)
      .then(response => {
        return response;
      })
  );
};

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
