import { OptionType } from './types/OptionType';
import { Todo } from './types/Todo';

export const filterByOption = (todos: Todo[], option: OptionType) => {
  switch (option) {
    case OptionType.all:
      return todos;
    case OptionType.active:
      return todos.filter(todo => !todo.completed);
    case OptionType.completed:
      return todos.filter(todo => todo.completed);
    default:
      throw new Error('Error, incorrect option.');
  }
};

export const filterBySearchQuery = (todos: Todo[], query: string): Todo[] => (
  todos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())))
);
