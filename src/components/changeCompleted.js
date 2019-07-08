const changeCompleted = (index, todo, todos, func) => {
  todo.completed = !todo.completed;
  todos.splice(index, 1, todo);
  func({ todos: [...todos] });
};

export default changeCompleted;
