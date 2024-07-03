import { Todo } from '../../types/Todo';

export type TodoListProps = {
  todos: Todo[];
  filter: string;
  chooseTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
  filterCategory: string;
};
