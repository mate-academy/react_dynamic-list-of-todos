// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Users {
  data: User[];
}

interface User {
  id: number;
  name: string;
  userName: string;
  [prop: string]: any;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
