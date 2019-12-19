const URL = 'https://jsonplaceholder.typicode.com/users';

const GetUsers = () => fetch(URL)
  .then(response => response.json());

export default GetUsers;
