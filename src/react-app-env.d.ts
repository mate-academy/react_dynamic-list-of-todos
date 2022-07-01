/// <reference types="react-scripts" />

type Todo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};
