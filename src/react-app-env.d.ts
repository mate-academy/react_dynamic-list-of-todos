// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

interface User {
  id: number;
  name: string;
}

interface Todos {
  todos: Todo[];
}

type SortPanelProps = {
  handleSort: Function;
};

interface ButtonProps {
  handleSort: Function;
  sortType: string;
}
