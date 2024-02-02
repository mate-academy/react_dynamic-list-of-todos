import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export function prepareTodos(todos: Todo[], querry = '', filter = Filter.All): Todo[] {
  let copy = [...todos];
  const normalizedQerry = querry.trim().toLowerCase();

  if (normalizedQerry) {
    copy = copy.filter(todo => todo.title.toLowerCase().includes(normalizedQerry));
  }

  if (filter !== Filter.All) {
    copy = copy.filter(todo => {
      if (filter === Filter.Active) {
        return todo.completed === false;
      }

      if (filter === Filter.Completed) {
        return todo.completed === true;
      }

      return true;
    });
  }

  return copy;
}
