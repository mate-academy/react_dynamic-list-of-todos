import { get } from '../api';
import { Todo } from '../types/Todo';

export const getTodos = () => get<Todo[]>('/todos');
