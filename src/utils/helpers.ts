import { CompleteTodo } from '../constants/types';

export const sortTodosByTitle = (todos: CompleteTodo[]): CompleteTodo[] => {
  return todos
    .slice()
    .sort((todoA, todoB) => {
      return todoA.title >= todoB.title
        ? 1
        : -1;
    });
};

export const sortTodosByCompleteness = (todos: CompleteTodo[]): CompleteTodo[] => {
  return todos
    .slice()
    .sort((todoA, todoB) => {
      return +todoA.completed >= +todoB.completed
        ? 1
        : -1;
    });
};

export const sortTodosByName = (todos: CompleteTodo[]): CompleteTodo[] => {
  return todos
    .slice()
    .sort((todoA, todoB) => {
      return todoA.user.name >= todoB.user.name
        ? 1
        : -1;
    });
};
