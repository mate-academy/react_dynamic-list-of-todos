import { Todo } from './Todo';

export interface TodoListProps {
  todos: Todo[];
  activeTodo: Todo | undefined;
  openAction: (activeTodoItem: Todo | undefined) => void;
}
