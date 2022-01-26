/// <reference types="react-scripts" />

type Todo = {
  completed: boolean;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
};

type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};
