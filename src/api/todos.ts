import { get } from './api';
import { Todo } from '../types/Todo';

export async function getTodos() {
  return get<Todo[]>('/todos');
}
