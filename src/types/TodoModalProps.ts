import { Todo } from './Todo';
import { User } from './User';

export interface TodoModalProps {
  todo: Todo | null;
  user: User | null;
  isLoadingUser: boolean;
  onClose: () => void;
}
