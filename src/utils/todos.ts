import { Todo } from '../types/Todo';
import { getData } from './httpClients';

const TODOS_URL = '/todos.json';

export function getTodos() {
  return getData<Todo[]>(TODOS_URL);
}
