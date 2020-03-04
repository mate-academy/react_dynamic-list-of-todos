import { todosURL } from '../utils/constants';
import { TodoType } from '../utils/interfaces';
import { getData } from './getData';


export const getTodos = async (): Promise<TodoType[]> => {
  return getData<TodoType[]>(todosURL);
};
