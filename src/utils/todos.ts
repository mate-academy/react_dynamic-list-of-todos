import { Todo } from '../types/Todo';
import { getData } from './httpClient';

export const getToDos = () => {
  return getData<Todo[]>('/todos.json').then(todos => todos);
};

export const getActiveTodo = () => {
  return getToDos().then(todos => {
    return todos.filter(todo => !todo.completed);
  });
};

export const getComplitedTodo = () => {
  return getToDos().then(todos => {
    return todos.filter(todo => todo.completed);
  });
};
