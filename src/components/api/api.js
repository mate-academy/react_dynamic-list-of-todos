// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com`;

export function allTodos(point, id) {
  return fetch(
    id ? `${API_URL}${point}${id}` : `${API_URL}${point}`,
  )
    .then(response => response.json());
}
