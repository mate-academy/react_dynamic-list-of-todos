// eslint-disable-next-line
const BASE_URL = `https://mate-api.herokuapp.com`;

export async function getAllToodos() {
  const response = await fetch(`${BASE_URL}/todos`);
  const data = await response.json();
  const result = await data.data;

  return result;
  // return fetch(`${BASE_URL}/todos`)
  // .then(response => response.json()).then(result => result.data);
}

export function selectedUser(userId) {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json()).then(result => result.data);
}
