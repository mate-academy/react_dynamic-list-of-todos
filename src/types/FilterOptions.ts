import { TodoStatus } from './TodoStatus';

export interface FilterOptions {
  status: TodoStatus;
  query: string;
}
