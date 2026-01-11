import { Todo } from '../types/Todo';
import { getData } from '../utils/httpClent';

export function getTodos() {
  return getData<Todo[]>('/todos.json').then(todos => todos);
}
