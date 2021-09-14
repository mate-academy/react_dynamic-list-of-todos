/// <reference types="react-scripts" />

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type User =  {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}