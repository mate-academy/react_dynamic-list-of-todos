import { Status } from './Status';
import { Todo } from './Todo';

export interface Context {
  isShow: boolean,
  setIsShow: (value: boolean) => void,
  selectedTodo: Todo | null,
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  filterTodos: Status,
  setFilterTodos: (filterField: Status) => void,
  query: string,
  setQuery: (value: string) => void,
}
