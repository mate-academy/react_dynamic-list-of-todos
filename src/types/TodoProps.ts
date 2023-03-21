import { Todo } from './Todo';

type GetTodo = (todo: Todo) => void;

export interface TodoItemProps {
  todo: Todo;
  selectedTodoId: number,
  showTodoInfo: GetTodo,
}

export interface TodoListProps {
  todos: Todo[];
  selectedTodoId: number,
  showTodoInfo: GetTodo,
}
