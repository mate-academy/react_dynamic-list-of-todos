/// <reference types="react-scripts" />

interface Todo {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdAt: string,
  updatedAt: string,
}

interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
}
