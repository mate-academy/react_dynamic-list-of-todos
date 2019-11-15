const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

const getDataFromServer = url => fetch(url)
  .then(response => response.json());

const data = async() => Promise.all([
  getDataFromServer(todosUrl),
  getDataFromServer(usersUrl),
]);

export default data;
