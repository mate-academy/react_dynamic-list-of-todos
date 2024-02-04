import { Todo } from './Todo';
import { User } from './User';
import { Status } from './Status';

export interface Context {
  todos: Todo[],
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  selectedTodo: Todo | null,
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  status: Status,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}
