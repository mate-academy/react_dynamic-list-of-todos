/// <reference types="react-scripts" />

interface Todo {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
}

interface User {
  id: number,
  createAt: string,
  updatedAt: string,
  name: string,
  username: string | null,
  email: string | null,
  phone: string | null,
  website: string | null,
}
