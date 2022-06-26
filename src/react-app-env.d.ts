/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

export interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
}

export interface State {
  todos: Todo[],
  user: User | null,
}

export interface Action {
  type: string,
  payload: any,
}
