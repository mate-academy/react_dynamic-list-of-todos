const apiUrl = `https://mate-api.herokuapp.com`;

export function getTodos() {
  return fetch(`${apiUrl}/todos`).then(response => response.json());
}

export function getUserbyId(id) {
  return fetch(`${apiUrl}/users/${id}`).then(response => response.json());
}
