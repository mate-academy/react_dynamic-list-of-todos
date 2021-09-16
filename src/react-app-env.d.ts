/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdAt: string,
  updatedAt: string,
}; /* TODO: DESCRIBE */

type User = {
  id: number,
  name: string,
  email: string,
  username: string,
  phone: string,
};
