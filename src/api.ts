export async function getTodo(): Promise<Todo[]> {
  return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json());
}

export async function getUser(): Promise<User[]> {
  return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface TodoWithUser extends Todo {
  user: User;
}
