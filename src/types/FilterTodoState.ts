import { TodoStatus } from './TodoStatus';

export interface FilterTodoState {
  todoStatus: TodoStatus,
  searchQuery: string,
}
