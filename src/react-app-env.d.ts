// / <reference types="react-scripts" />

export interface Todo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
