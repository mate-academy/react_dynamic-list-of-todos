export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export interface User {
  id: number;
  name: string;
}

export interface Todos {
  todos: Todo[];
}

export type SortPanelProps = {
  handleSort: Function;
};

export interface ButtonProps {
  handleSort: Function;
  sortType: string;
}
