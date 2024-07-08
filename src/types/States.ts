import { Todo } from './Todo';

export interface States {
  todos: Todo[];
  isLoading: boolean;
  errorMessage: string;
  updateAt: Date;
  isModalOpen: boolean;
  selectedTodo: number;
}
