const BASE_URL = 'https://mate.academy/students-api';

export const loadData = (endPoint: string) => {
  const url = `${BASE_URL}/${endPoint}`;

  return fetch(url)
    .then(response => response.json());
};
