import { AllOptions, Todo } from '../types';

export function handleFilteringTodos(
  todosList: Todo[],
  inputValue: string,
  selectOption: AllOptions,
): Todo[] {
  let filteredTodos = [...todosList];

  if (selectOption) {
    switch (selectOption) {
      case AllOptions.Active:
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;

      case AllOptions.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;

      case AllOptions.All:
      default:
        break;
    }
  }

  if (inputValue.trim()) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }

  return filteredTodos;
}
