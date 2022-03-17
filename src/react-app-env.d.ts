/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  createdAt: Data,
  updatedAt: Data,
  userId: number,
  title: string,
  completed: boolean,
};

export type User = {
  id: number,
  createdAt: Data,
  updatedAt: Data,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};
