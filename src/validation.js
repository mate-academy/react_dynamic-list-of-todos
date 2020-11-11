export function validateTodos(todos) {
  return todos.filter(todo => isValidTodo(todo));
}

function isValidTodo(todo) {
  return todo.userId
        && todo.id
        && todo.title
        && typeof todo.completed === 'boolean';
}
