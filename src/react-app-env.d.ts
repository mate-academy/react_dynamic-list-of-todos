/// <reference types="react-scripts" />

type Todo = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  title: string;
  completed: boolean;
};

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};
