export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export interface TodoListProps {
  todos: Todo[];
}

export interface User {
  id?: number;
  name: string;
  username?: string;
  email?: string;
  address?: object;
}

export interface AppState {
  isButtonVisible: boolean;
  isButtonDisabled: boolean;
  preparedTodos: Todo[];
  usersFromServer: User[];
  todosFromServer: Todo[];
  buttonText: string;
  sortedBy: string;
}
