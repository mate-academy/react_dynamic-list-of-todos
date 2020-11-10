const BASE_URL = `https://mate-api.herokuapp.com`;
const todosUrl = `${BASE_URL}/todos`;
const userUrl = `${BASE_URL}/users/`;

function checkFilterCondition(todo) {
  let condition = true;

  if (todo.userId === null) {
    condition = false;
  }

  if (todo.title === '') {
    condition = false;
  }

  if (todo.completed === null) {
    condition = false;
  }

  return condition;
}

export function getTodos() {
  return fetch(todosUrl)
    .then(response => response.json())
    .then(todos => todos.data
      .filter(todo => checkFilterCondition(todo)));
}

export function getUser(userId) {
  return fetch(`${userUrl}${userId}`)
    .then(response => response.json());
}
