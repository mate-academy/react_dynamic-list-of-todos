import { Todo } from '../types/Todo';

export const sortedTodos = (
  intialTodos: Todo[],
  selectedValue: string,
): Todo[] => {
  const allTodos = [...intialTodos];

  if (selectedValue) {
    switch (selectedValue) {
      case 'active':
        return allTodos.filter(
          todo => !todo.completed,
        );

      case 'completed':
        return allTodos.filter(
          todo => todo.completed,
        );

      default:
        return allTodos;
    }
  }

  return allTodos;
};
