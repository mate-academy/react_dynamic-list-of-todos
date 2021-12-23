export interface Todo {
  completed: boolean;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export type User = {
  name: string;
  email: string;
  phone: string;
  id: number;
};
