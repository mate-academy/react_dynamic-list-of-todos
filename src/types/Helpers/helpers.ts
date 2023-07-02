import React from 'react';
import { Todo } from '../Todo';

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
