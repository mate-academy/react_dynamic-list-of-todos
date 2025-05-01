import { Todo } from '../types/Todo';

const filterTodos = (todos: Todo[], filter: string, query: string) => {
  return todos.filter(todo => {
    if (filter === 'active' && todo.completed) {
      return false;
    }

    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  });
};

export default filterTodos;
