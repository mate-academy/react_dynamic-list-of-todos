import { Todo } from '../../types/Todo';

export interface Props {
  selectedTodo: Todo,
  handleCloseButton: () => void,
}
