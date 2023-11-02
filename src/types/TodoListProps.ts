import { Todo } from './Todo';

export interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  selectedTodoId: number | null;
}
