const API_USERS = 'https://jsonplaceholder.typicode.com/users';

function getAllUsers() {
  return fetch(API_USERS)
    .then(users => users.json());
}

export default getAllUsers;
