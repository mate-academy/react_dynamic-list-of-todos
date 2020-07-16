export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoModifiedType {
  [key: string]: number | string | boolean;
}

export interface TodoModified extends TodoModifiedType {
  id: number;
  title: string;
  completed: boolean;
  userName: string;
}
