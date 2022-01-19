const BASE_URL = 'https://mate.academy/students-api';

export const getData = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};
