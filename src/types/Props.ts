import { StatusFilter } from './StatusFilter';
import { Todo } from './Todo';

export interface TodoFilterProps {
  statusFilter: StatusFilter;
  searchQuery: string;
  onStatusFilterChange: (statusFilter: 'all' | 'active' | 'completed') => void;
  onSearchQueryChange: (searchQuery: string) => void;
}

export interface TodoModalProps {
  todos: Todo[];
  selectedTodoId: number | null;
  onClose: () => void;
}

export interface TodoListProps {
  todos: Todo[];
  selectedTodoId: number | null;
  onSelectTodo: (todoId: number) => void;
}
