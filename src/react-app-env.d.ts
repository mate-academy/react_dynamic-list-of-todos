/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
}

export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type State = {
  todos: Todo[],
  user: User | null,
};

export interface Action {
  type: string,
  payload: any,
}
