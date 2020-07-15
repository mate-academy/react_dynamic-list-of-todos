export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
}

export interface TodosWithUsers {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
