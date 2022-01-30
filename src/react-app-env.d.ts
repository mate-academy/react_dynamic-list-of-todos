/// <reference types="react-scripts" />

interface Todo {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
}

interface User {
  id: 7;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

type FilterTodosCallback = (todos: Todo[], substr: string, status: string) => Todo[];
