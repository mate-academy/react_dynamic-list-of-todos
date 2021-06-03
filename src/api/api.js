const API_URL = `https://mate-api.herokuapp.com`;

export function request(endpoint, query) {
  return fetch(
    !query ? `${API_URL}${endpoint}` : `${API_URL}${endpoint}${query}`,
  )
    .then(response => response.json());
}
