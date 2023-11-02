import { Todo } from './Todo';

export interface TodoModalProps {
  onClose: () => void;
  todo: Todo;
}
