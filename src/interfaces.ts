export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Сompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Сompany;
}

export interface TodosWithUsers {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
