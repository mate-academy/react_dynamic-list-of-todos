// const API_URL = 'https://mate-academy.github.io/fe-students-api/';

export function getTodos() {
  return fetch('https://mate.academy/students-api/todos')
    .then(response => response.json());
}

export function getUser(userId: number) {
  return fetch(`https://mate.academy/students-api/users/${userId}`)
    .then(response => response.json())
    .catch(error => `Error - ${error}`);
}
