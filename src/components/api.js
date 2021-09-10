export const getTodos = (url) => {
  const BASE_URL = 'https://mate.academy/students-api';

  return fetch(`${BASE_URL}/${url}`)
    .then(data => {
      return data;
    });
};
