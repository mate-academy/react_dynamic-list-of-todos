/// <reference types="react-scripts" />

interface Todo {
  completed: boolean;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
