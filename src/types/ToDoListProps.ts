import { Todo } from './Todo';

export interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedTodoId: number | null;
  setSelectedTodoId: (id: number | null) => void;
}
