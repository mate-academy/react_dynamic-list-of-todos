export interface Todo {
  title: string;
  userId: number;
  completed: boolean;
  name: string;
}

export interface User {
  name: string;
  id: number;
  email: string | null;
  phone: string | null;
}
