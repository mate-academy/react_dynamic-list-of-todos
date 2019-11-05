const TODO_LIST_URL = 'https://jsonplaceholder.typicode.com/todos';
const USER_LIST_URL = 'https://jsonplaceholder.typicode.com/users';

export function getData(URL) {
  return fetch(URL).then(response => response.json());
}

export const getTodoList = () => getData(TODO_LIST_URL);
export const getUserList = () => getData(USER_LIST_URL);
