// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

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
  geo: {
    lat: string;
    lng: string;
  };
}

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

interface TodoWithUser extends Todo {
  user: User | undefined;
}
