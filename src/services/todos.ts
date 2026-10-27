import { Todo } from '../types/Todo';
import { getData } from '../utils/httpClient';

export function getPosts() {
  return getData<Todo[]>('api/todos.json');
}
