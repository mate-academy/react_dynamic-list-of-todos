const URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => fetch(URL)
  .then(response => response.json());
