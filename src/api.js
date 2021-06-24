const url = `https://mate-api.herokuapp.com/todos`;
const usersUrl = `https://mate-api.herokuapp.com/users/`;

export function request() {
  return fetch(url)
    .then(res => res.json())
    .then(todos => todos.data);
}

export function requestUser(id) {
  return fetch(`${usersUrl}${id}`)
    .then(res => res.json())
    .then(user => user.data);
}
