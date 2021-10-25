const baseUrl = 'https://mate.academy/students-api';

export const getData = <T>(endpoint = ''):Promise<T> => (
  fetch(`${baseUrl}${endpoint}`)
    .then(response => response.json())
);
