const TODO_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

function validateTodos(todos) {
  return todos.filter(todo => isValidTodo(todo));
}

function isValidTodo(todo) {
  return todo.userId
        && todo.id
        && todo.title
        && typeof todo.completed === 'boolean';
}

export const getTodos = () => fetch(TODO_URL)
  .then(respones => respones.json())
  .then(result => validateTodos(result.data));

export const getUser = userId => fetch(`${USERS_URL}/${userId}`)
  .then(respones => respones)
  .then(result => result.json());
