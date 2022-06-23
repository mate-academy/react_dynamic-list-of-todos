export interface Todo {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface User {
  id: number,
  username: string,
  email: string,
  website: string,
  phone: string,
  name: string,
  createdAt: Date,
  updatedAt: Date,
}
