export const usersPromise = () => fetch(
  'https://jsonplaceholder.typicode.com/users'
).then(
  response => response.json()
);
