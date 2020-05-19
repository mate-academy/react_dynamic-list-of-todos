// eslint-disable-next-line
/// <reference types="react-scripts" />
interface User {
  id: number;
  name: string;
}

type Users = User[];

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type Todos = Todo[];

interface PreparedTodo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
  users: User;
}

type PreparedTodos = PreparedTodo[];
