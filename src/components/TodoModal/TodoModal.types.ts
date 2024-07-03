import { Todo } from '../../types/Todo';

export type TodoModalProps = {
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
};
