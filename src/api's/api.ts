export function getTodos() {
  return fetch('https://mate.academy/students-api/todos')
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}

export function getUser(userId: number) {
  return fetch(`https://mate.academy/students-api/users/${userId}`)
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}
