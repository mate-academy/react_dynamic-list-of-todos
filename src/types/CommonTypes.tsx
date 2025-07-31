import { Todo } from './Todo';

export type TodoListProps = {
  listOfVisibleTodos: Todo[] | null;
  onTodoSelected: (selectedTodo: Todo) => void;
  currentTodoId?: number | null;
};

export type TodoModalProps = {
  todoUserId: number;
  currentTodo: Todo;
  onCloseModal: () => void;
};

export interface TodoFilterProps {
  todos: Todo[] | null;
  onSelected: (filtered: Todo[]) => void;
}
