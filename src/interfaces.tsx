export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
}

export interface TodoWithUser {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
}
