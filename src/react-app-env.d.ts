/// <reference types="react-scripts" />

export interface User {
  id: number,
  name: string,
  email: string,
  phone: number,
}

export interface Todo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
}
