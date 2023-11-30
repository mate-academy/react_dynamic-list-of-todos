import { get } from './index';
import { Todo } from '../types/Todo';

export async function getTodos() {
  return get<Todo[]>('/todos');
}
