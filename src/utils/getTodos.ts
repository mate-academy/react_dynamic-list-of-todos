import { Todo } from '../types/Todo';
import { getData } from './httpClient';
const todosUrl = '/todos.json';

export function getTodos() {
  return getData<Todo[]>(todosUrl);
}
