import { getData } from '../api';
import { Todo } from '../types/Todo';

export const getTodos = () => getData<Todo[]>('/todos');
