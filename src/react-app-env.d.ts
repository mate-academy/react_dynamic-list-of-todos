// eslint-disable-next-line
/// <reference types="react-scripts" />

type Users = User[];

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {};
  phone: string;
  website: string;
  company: {};
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type Todos = Todo[];

type GetTodos = GetTodo[];

interface GetTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
