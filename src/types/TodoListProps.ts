import { Todo } from './Todo';

export type TodoListProps = {
  list: Todo[];
  setId: (a: number) => void;
  modalId: number;
};
