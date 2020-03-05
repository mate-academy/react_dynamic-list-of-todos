// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type Todos = Todo[];

interface Geo {
  lat: string;
  lng: string;
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

interface User {
  id: number;
  username: string;
  email: string;
  adress: Address;
  geo: Geo;
  phone: string;
  website: string;
  company: Company;
}

type Users = User[];

interface PreparedTodo extends Todo {
  user: User;
}

type PreparedTodos = PreparedTodo[];
