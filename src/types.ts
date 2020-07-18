export interface Geo {
  lat?: string;
  lng?: string;
}

export interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface PreparedTodo {
  id: number;
  userId: number;
  title: string;
  completed: string;
  createdAt: string;
  updatedAt: string;
}
