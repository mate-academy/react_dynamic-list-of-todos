// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Adress {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: Adress;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
}
