import { TodoStatus } from '../types/TodoStatus';

export const FILTER_OPTIONS = [
  { value: TodoStatus.All, label: 'All' },
  { value: TodoStatus.Active, label: 'Active' },
  { value: TodoStatus.Completed, label: 'Completed' },
];
