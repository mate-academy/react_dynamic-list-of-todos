/// <reference types="react-scripts" />

type Todo = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
};

type Address = {
  id: number,
  userId: number,
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  createdAt: string,
  updatedAt: string,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  updatedAt: string,
  address: Address,
};
