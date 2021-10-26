/// <reference types="react-scripts" />

type Todo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  completed: boolean
};

type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  userId: number;
};
