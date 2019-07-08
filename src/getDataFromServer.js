export const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const theseTodos = await response.json();

  return theseTodos;
};

export const getUsers = async() => {
  const response = await fetch(' https://jsonplaceholder.typicode.com/users');
  const theseUsers = await response.json();

  return theseUsers;
};
