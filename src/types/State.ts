import { Filter } from './Filter';
import { Todo } from './Todo';
import { User } from './User';

export interface State {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  selectedTodo: Todo | null,
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  filterBy: Filter,
  setFilterBy: React.Dispatch<React.SetStateAction<Filter>>,
  filterByQuery: string,
  setFilterByQuery: React.Dispatch<React.SetStateAction<string>>,
  hasTodoModal: boolean;
  setHasTodoModal: React.Dispatch<React.SetStateAction<boolean>>,
}
