import { Todo } from './Todo';
import { User } from './User';

export interface States {
  todos: Todo[];
  users: User[];
  errorMessage: string;
  isLoading: boolean;
  isModalOpened: boolean;
  updateAt: Date;
  selectedTodoId: number | null;
}
