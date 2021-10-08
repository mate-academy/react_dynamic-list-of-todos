/// <reference types="react-scripts" />

interface BaseData {
  id: number,
  createdAt: Date,
  updatedAt: Date,
}

interface Todo extends BaseData{
  userId: number,
  title: string,
  completed: boolean,
}

interface User extends BaseData{
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}
