import { Todo } from './Todo';

export interface TodoListProps {
  todos: Todo[];
  activeTodo: Todo | null;
  openAction: (activeTodoItem: Todo | null) => void;
}
