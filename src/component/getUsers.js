const getUsers = async() => {
  const responce = await fetch('https://jsonplaceholder.typicode.com/users');
  return await responce.json();
};

export default getUsers;
