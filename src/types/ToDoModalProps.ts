import { Todo } from './Todo';
import { User } from './User';

export interface TodoModalProps {
  todo: Todo;
  user: User | null;
  onClose: () => void;
  isLoading?: boolean;
}
