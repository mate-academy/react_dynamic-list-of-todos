export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type TodoContextType = {
  todos: Todo[],
  onFiltered: (newFiltered: Todo[]) => void,
  filteredTodos: Todo[],
  handleFilterAll: () => void,
  handleActive: () => void,
  handleCompleted: () => void,
  filtred: Todo[],
  onQuery: (newQuery: string) => void,
  query: string,
  filtrar: string,
  handleModalClick: () => void,
  showModal: (show: boolean) => void
  isLoading: boolean,
  handleIsLoading: (loading: boolean) => void
  isLoadingModal: boolean,
  handleGetTodoId: (id: number) => void,
  todoId: number | null,
  handleUserId: (id: number) => void,
  userId:number | null,
}
