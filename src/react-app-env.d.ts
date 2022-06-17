/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
}; /* TODO: DESCRIBE */

export type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  username: string,
};
