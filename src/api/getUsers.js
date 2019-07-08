const getUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  return fetch(url)
    .then(response => response.json());
};

export default getUsers;
