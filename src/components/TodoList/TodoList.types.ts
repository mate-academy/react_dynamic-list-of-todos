import { Todo } from '../../types/Todo';

export interface Props {
  todosFromServer: Todo[],
  onTodoSelect: (todo: Todo) => void,
  selectedTodo: Todo | null,
  // isError: boolean,
}
