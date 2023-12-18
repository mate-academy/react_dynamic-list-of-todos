import { getData } from '../utils/httpClients';
import { Todo } from '../types/Todo';

export function getTodos() {
  return getData<Todo[]>('/todos.json');
}
