/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  createdAt?: string,
  updatedAt?: string,
  userId: number,
  title: string,
  completed: boolean,
};

export type User = {
  id: number,
  createdAt?: string,
  updatedAt?: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};
