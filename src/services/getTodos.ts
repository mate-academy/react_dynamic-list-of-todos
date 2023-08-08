import { Todo } from '../types/Todo';
import { getData } from './httpClients';

export function getTodos() {
  return getData<Todo[]>('todos.json')
    .then(todos => todos);
}
