export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoWithUser extends Todo {
  user: User | undefined;
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

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export async function loadData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => response.json());
}

export async function loadTodos(): Promise<Todo[]> {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json());
}

export async function loadUsers(): Promise<User[]> {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());
}
