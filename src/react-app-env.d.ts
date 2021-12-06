/// <reference types="react-scripts" />

type Todo = {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
  createdAt: string;
  updatedAt: string;
}; /* TODO: DESCRIBE */

type User = {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: UserAddress;
};

type UserAddress = {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
};
