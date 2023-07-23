import { Todo } from '../types/Todo';
import { getData } from './httpClient';

export function getTodos() {
  return getData<Todo[]>('/todos.json')
    .then(todos => todos);
}
