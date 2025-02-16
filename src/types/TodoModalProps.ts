import { Todo } from './Todo';

export interface TodoModalProps {
  todo: Todo;
  closeModal: () => void;
}
