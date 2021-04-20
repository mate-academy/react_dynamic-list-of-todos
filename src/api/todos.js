const TODOS_API = 'https://mate-api.herokuapp.com/todos';
const USERS_API = 'https://mate-api.herokuapp.com/users';

const getData = url => (
  fetch(url)
    .then(response => response.json())
    .then(result => result.data)
);

export const getTodos = () => getData(TODOS_API);
export const getUser = userId => getData(`${USERS_API}/${userId}`);
