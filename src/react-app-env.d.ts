/// <reference types="react-scripts" />

type Todo = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
}; /* TODO: DESCRIBE */

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
