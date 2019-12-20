const URL_API = 'https://jsonplaceholder.typicode.com/users';

export const users = () => (
  fetch(URL_API)
    .then(response => response.json())
);
