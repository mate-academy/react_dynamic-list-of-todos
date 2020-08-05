export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

export interface PreparedTodo {
  todo: Todo;
  user: User;
}

export type SortCallback = (todos: PreparedTodo[]) => PreparedTodo[];

export interface SortButtons {
  id: number;
  title: string;
  callback: SortCallback;
}
