/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  title: string,
  userId: number,
  createdAt: string,
  updatedAt: string,
  completed: boolean,
};

export type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
  website: string,
  username: string,
  createdAt: string,
  updatedAt: string,
};
