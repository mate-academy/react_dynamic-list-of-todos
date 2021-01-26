export function getTodos() {
  return fetch('https://mate-api.herokuapp.com/todos')
    .then(response => response.json());
}
