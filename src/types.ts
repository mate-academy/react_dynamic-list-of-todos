export type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};

export interface Todo {
  completed: boolean;
  id: number;
  createdAt: string;
  updatedAp: string;
  userId: number;
  title: string;
}
