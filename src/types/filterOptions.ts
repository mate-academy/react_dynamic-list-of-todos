import { TodoStatus } from './TodoStatus';

export interface FilterOptions {
  todoStatus: TodoStatus,
  searchQuery: string,
}
