const API_URL = `https://mate-api.herokuapp.com`;

const request = url => fetch(`${API_URL}${url}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(
      `${response.status} ${response.statusText}`,
    );
  });

export function getTodos() {
  return request(`/todos`);
}

export function getUser(id) {
  return request(`/users/${id}`);
}
