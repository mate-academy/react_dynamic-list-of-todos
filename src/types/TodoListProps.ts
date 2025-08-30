import { Todo } from './Todo';

export type TodoListProps = {
  todos: Todo[];
  selectedTodoId: number | null;
  onTodoSelect: (todo: Todo) => void;
};
