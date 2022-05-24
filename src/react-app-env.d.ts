/// <reference types="react-scripts" />

export type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

export type User = {
  id: number,
  name: string,
  username: string,
  email: string
};
