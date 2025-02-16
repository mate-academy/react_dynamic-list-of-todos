import { getData } from '../utils/httpClient';

export function getTodos() {
  return getData('/todos.json').then(todos => todos);
}
