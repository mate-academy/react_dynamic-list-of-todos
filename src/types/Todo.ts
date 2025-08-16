export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  todos: Todo[];
  query: string;
  todo: [];
  onClosed: () => void;
  onTodoClick: (todo: Todo) => void;
  onStatusChange: (status: string) => void;
  onQueryChange: (newQuery: string) => void;
}
