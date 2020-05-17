// eslint-disable-next-line
/// <reference types="react-scripts" />
interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  geo: Geo;
  phone: string;
  website: string;
  company: Company;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: string;
  lng: string;
}

type Users = User[];

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type Todos = Todo[];

interface PreparedTodo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
  users: User;
}

type PreparedTodos = PreparedTodo[];
