import { Todo } from '../types/Todo';
import { getData } from './httpClient';

export function getTodos(): Promise<Todo[]> {
  return getData<Todo[]>('/todos.json');
}
