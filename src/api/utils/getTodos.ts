import { TODOS_URL } from '../constants/constants';
import { getData } from './getData';

export const getTodos = (): Promise<Todo[]> => getData<Todo[]>(TODOS_URL);
