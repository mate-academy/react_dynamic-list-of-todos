export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

interface Address {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
}
