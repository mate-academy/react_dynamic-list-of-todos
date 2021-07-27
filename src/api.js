const todosUrl = 'https://mate-api.herokuapp.com/todos';
const userUrl = 'https://mate-api.herokuapp.com/users';

export function getTodos() {
  return fetch(todosUrl)
    .then(response => response.json())
    .then(response => response.data);
}

export function getUserInfo(id) {
  return fetch(`${userUrl}/${id}`)
    .then(result => result.json())
    .then(response => response.data);
}
