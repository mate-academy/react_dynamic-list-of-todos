const todosUrl = 'https://mate-api.herokuapp.com/todos';
const userUrl = 'https://mate-api.herokuapp.com/users';

const getData = url => fetch(url)
  .then(response => response.json())
  .then(response => response.data)
  .catch((error) => {
    alert.error('Error', error);
  });

export function getTodos() {
  return getData(todosUrl);
}

export function getUser(id) {
  return getData(`${userUrl}/${id}`);
}
