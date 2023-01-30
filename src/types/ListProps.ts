import { Todo } from './Todo';

export interface ListProps {
  todos: Todo[],
  selectedTodoById: number,
  handleSelectTodo: (todoId: number) => void,
}
