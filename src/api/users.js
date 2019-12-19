
const users = () => {
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';

  return fetch(urlUsers)
    .then(userslist => userslist.json());
};

export default users;
