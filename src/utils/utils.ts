export const sortTodos = (todos: TodoWithUser[], sortBy: string) => {
  switch (sortBy) {
    case 'name': {
      todos.sort((todoA, todoB) => (
        todoA.user.name.localeCompare(todoB.user.name)
      ));
      break;
    }

    case 'title': {
      todos.sort((todoA, todoB) => (
        todoA.title.localeCompare(todoB.title)
      ));
      break;
    }

    case 'completed': {
      todos.sort((todoA, todoB) => (+todoA.completed - +todoB.completed));
      break;
    }

    default: break;
  }
};
