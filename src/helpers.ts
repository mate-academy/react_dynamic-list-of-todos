import { OptionType } from './types/OptionType';
import { Todo } from './types/Todo';

export const successFilter = (todos: Todo[], option: OptionType) => {
  switch (option) {
    case OptionType.ALL:
      return todos;
    case OptionType.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case OptionType.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      throw new Error('Error, incorrect option.');
  }
};

export const filterByQuery = (todos: Todo[], query: string): Todo[] => (
  todos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())))
);
