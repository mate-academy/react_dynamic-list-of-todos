/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdA: string,
  updatedAt: string,
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
