/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  completed: boolean,
};

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};
