export function getTodos() {
  return fetch(`https://mate-api.herokuapp.com/todos`)
    .then(response => response.json())
    .then(result => result.data.filter(todo => (
      todo.title !== null
      && todo.title !== ''
      && todo.userId !== null
      && todo.completed !== null
    )));
}

export function getUsers(userId) {
  return fetch(`https://mate-api.herokuapp.com/users/${userId}`)
    .then(response => response.json());
}
