/// <reference types="react-scripts" />

export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
};
