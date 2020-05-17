// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

type FullTaskList = Todos[];

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type TodoList = TodoItem[];

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

type Users = User[];

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}
