/// <reference types="react-scripts" />

export type Todo = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  title: string;
  completed: boolean;
};

export type User = {
  id: number,
  createdAt: Date;
  updatedAt: Date;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};
