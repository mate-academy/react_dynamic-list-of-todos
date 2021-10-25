// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api`;

export const promise = (endPoint: string) => {
  const fullURL = `${API_URL}/${endPoint}`;

  return fetch(fullURL)
    .then(response => response.json());
};
