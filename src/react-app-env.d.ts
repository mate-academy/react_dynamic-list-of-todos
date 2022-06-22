/// <reference types="react-scripts" />

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string
}
