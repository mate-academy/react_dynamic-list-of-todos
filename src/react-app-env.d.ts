/// <reference types="react-scripts" />

export type Todo = {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};
