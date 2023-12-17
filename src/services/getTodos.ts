import { Todo } from '../types/Todo';
import { getData } from '../utils/getData';

export function getTodos() {
  return getData<Todo[]>('todos.json');
}
