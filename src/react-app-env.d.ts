// <reference types=react-scripts />

type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdAt: string,
  updatedAt: string
};

type User = {
  id: number,
  name: string,
  phone: string,
  email: string,
};
