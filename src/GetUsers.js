const getUsers = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  const response = await fetch(url);
  const users = await response.json();

  return users;
}

export default getUsers;
