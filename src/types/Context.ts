import { Todo } from './Todo';

export interface ContextType {
  todos: Todo[],
  setTodos: (val: Todo[]) => void,
  selectedTodoId: number,
  setSelectedTodoId: (val: number) => void,
  searchQuery: string,
  filterType: string,
  setFilterType: (val: string) => void,
  setSearchQuery: (val: string) => void,
  listLoader: boolean,
  setListLoader: (val: boolean) => void,
  modalLoader: boolean,
  setModalLoader: (val: boolean) => void,
}
