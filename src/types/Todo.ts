export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoSelection {
  id: number,
  userId: number,
}

export type TodoContextType = {
  todos: Todo[];
  handleFilterAll: () => void;
  handleActive: () => void;
  handleCompleted: () => void;
  filtred: Todo[];
  onQuery: (newQuery: string) => void;
  query: string;
  filtrar: string;
  handleModalClick: (show: boolean) => void;
  isModalOpen: boolean;
  handleIsLoading: (loading: boolean) => void;
  isLoadingModal: boolean;
  handleGetTodoId: (id: number) => void;
  todoId: number | null;
  handleUserId: (id: number) => void;
  userId: number | null;
  handleShowTodo: (todo: TodoSelection) => void
};
