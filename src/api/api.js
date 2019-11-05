const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

const getData = async(url) => {
  const response = await fetch(url);

  return response.json();
};

export const getTodos = () => getData(todosUrl);

export const getUsers = () => getData(usersUrl);
