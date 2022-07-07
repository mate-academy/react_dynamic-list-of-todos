/// <reference types="react-scripts" />

interface Todo {
  UserId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}
