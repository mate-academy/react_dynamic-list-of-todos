export function getTodos() {
  return fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
  ).then((respons) => {
    if (!respons.ok) {
      throw new Error(`${respons.status} ${respons.statusText}`);
    }

    return respons.json();
  });
}
