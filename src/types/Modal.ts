import { Todo } from './Todo';

export interface Modal {
  isOpen: boolean;
  todo: Todo | undefined;
  userId: number | undefined;
}
