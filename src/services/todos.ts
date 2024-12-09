import { GetData } from '../utils/httpClient';

export function getTodos() {
  return GetData('todos.json');
}
