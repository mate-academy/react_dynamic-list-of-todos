const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = (url, options) => (
  fetch(BASE_URL + url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
);

export function getTodos() {
  return (
    request('todos')
      .then(result => result.data)
      .then(data => data.filter(todo => todo.title))
  );
}

export function getUsers() {
  return (
    request('users')
      .then(result => result.data)
  );
}
