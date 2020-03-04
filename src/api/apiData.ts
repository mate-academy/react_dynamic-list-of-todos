import { Todo, User } from './apiInterfaces';

export async function getTodo(): Promise<Todo[]> {
  return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json());
}

export async function getUser(): Promise<User[]> {
  return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
}
