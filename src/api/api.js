const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USER_URL = 'https://mate-api.herokuapp.com/users';

const getData = url => fetch(url)
  .then(response => response.json())
  .then(result => result.data);

export function getTodos() {
  return getData(TODOS_URL);
}

export function getUsers(iserId) {
  return getData(`${USER_URL}/${iserId}`);
}
