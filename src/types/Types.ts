export enum ActiveSelector {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface TodoItemProp {
  todoItem: Todo;
}

export interface TodoFilterProps {
  acitveSelector: string;
  setActiveSelector: (arg: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
}
