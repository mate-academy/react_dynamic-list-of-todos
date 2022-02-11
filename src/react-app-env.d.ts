/// <reference types="react-scripts" />
type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};

type Todo = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
};

type TodoStatus = 'finished' | 'unfinished' | 'all';
