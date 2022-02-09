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
  createdAt: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  updatedAt: string;
  username: string;
  website: string;
};
