const BASE_URL = 'https://mate-api.herokuapp.com';

function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(result => result.data);
}

export async function getTodos() {
  const todos = await request(`/todos`);

  return todos.filter(todo => todo.userId && todo.title);
}

export async function getUser(userId) {
  const user = await request(`/users/${userId}`);

  return user;
}
