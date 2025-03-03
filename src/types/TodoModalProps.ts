import { Todo } from './Todo';
export type TodoModalProps = {
  postId: number;
  resetId: (a: number) => void;
  list: Todo[];
};
