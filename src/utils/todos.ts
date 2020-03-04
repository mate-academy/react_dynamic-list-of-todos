import { TODOS_URL } from '../constants/api';
import { loadData } from './api';
import { Todo } from '../constants/types';

export const loadTodos = async (): Promise<Todo[]> => {
  return loadData(TODOS_URL);
};
