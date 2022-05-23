/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  updatedAt: string,
}
