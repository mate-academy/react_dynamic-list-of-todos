export function getAllTodos() {
  return fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(res => res
      .filter(el => (el.userId !== null && el.completed !== null)));
}

export function getUser(id = '') {
  return fetch(`https://jsonplaceholder.typicode.com/users${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(res => res);
}
