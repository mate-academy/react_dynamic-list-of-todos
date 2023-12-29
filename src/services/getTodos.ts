export function getTodos() {
  return fetch('https://mate-academy.github.io/'
  + 'react_dynamic-list-of-todos/api/todos.json')
    .then((response) => {
      return response.json();
    });
}
