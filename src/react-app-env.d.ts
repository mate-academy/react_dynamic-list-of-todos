/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: numder,
  title: string,
  completed: boolean,
}

export interface User {
  id: number,
  phone: string
  name: string,
  username: string,
  email: string,
}
