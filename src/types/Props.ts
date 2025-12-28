import { Todo } from './Todo';

export interface Props {
  todos: Todo[];
  handleTodoClick: (todo: Todo) => void;
  selectedTodoId: number | undefined;
}
