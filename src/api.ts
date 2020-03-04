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

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface TodoWithUser extends Todo {
  user: User;
}
