/// <reference types="react-scripts" />

type Todo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
  title: string;
  completed: boolean;
};

type User = {
  name: string;
  email: string;
  phone: string;
  id: number | null;
};
