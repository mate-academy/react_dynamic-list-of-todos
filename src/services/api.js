export function getAllTodos() {
  return fetch(`https://mate-api.herokuapp.com/todos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(res => res.data
      .filter(el => (el.userId !== null && el.completed !== null)));
}

export function getUser(id = '') {
  return fetch(`https://mate-api.herokuapp.com/users${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(res => res.data);
}
