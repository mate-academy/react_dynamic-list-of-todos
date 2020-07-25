export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
}
