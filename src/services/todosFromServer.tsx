export function getTodosFromServer() {
  return fetch('http://localhost:5173/api/todos.json').then(response => {
    if (!response.ok) {
      throw new Error('CARAMBA');
    }

    return response.json();
  });
}
