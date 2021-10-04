/// <reference types="react-scripts" />

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}
