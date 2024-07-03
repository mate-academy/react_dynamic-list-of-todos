import { Todo } from '../../types/Todo';

export type TodoModalProps = {
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
};
