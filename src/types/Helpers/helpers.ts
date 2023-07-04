import React from 'react';
import { Todo } from '../Todo';
import { FilterType } from '../FilterType';

export const filterTodosByStatus = (todos: Todo[], todoStatus: boolean) => (
  todos.filter(todo => todo.completed === todoStatus)
);

export const debounce = (
  f: React.Dispatch<React.SetStateAction<string>>,
  delay:number,
) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const filterTodos = (
  todos: Todo[],
  selectedOption: FilterType,
  searchQuery: string,
) => {
  return todos.filter(todo => {
    const isTodoIncluded = todo.title.toLowerCase().includes(searchQuery);

    switch (selectedOption) {
      case FilterType.All:
        return isTodoIncluded;

      case FilterType.Active:
        return isTodoIncluded && !todo.completed;

      case FilterType.Completed:
        return isTodoIncluded && todo.completed;

      default:
        throw new Error('Unable to filter todos');
    }
  });
};
