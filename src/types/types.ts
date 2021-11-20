export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Todo {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
}
