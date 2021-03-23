const url
  = 'https://mate-api.herokuapp.com/todos';

const usersUrl
  = 'https://mate-api.herokuapp.com/users/';

export const getData = () => (
  fetch(url)
    .then(response => response.json())
    .then(response => response.data)
);

export const getUsers = userId => (
  fetch(`${usersUrl}${userId}`)
    .then(response => response.json())
    .then(response => response.data)
);
