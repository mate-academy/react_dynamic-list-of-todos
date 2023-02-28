import { Todo } from './Todo';
import { TodoStatus } from './TodoStatus';

export type FilterTodos = (t: Todo[], q: string, c:TodoStatus) => Todo[];
