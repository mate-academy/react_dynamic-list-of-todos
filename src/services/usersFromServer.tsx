export function getUsersFromServer() {
  return fetch('http://localhost:5173/api/users.json').then(response => {
    if (!response.ok) {
      throw new Error('CARAMBA');
    }

    return response.json();
  });
}
