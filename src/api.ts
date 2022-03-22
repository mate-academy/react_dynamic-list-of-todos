const BASE_API_URL = 'https://mate.academy/students-api/';

export const request = (endpoint: string) => {
  return fetch(`${BASE_API_URL}${endpoint}`)
    .then(response => response.json())
    .catch(() => alert('server is dead'));
};
