export type Todo = {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
};

export type User = {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  phone: string | null;
  updatedAt: string | null;
  username: string | null;
  website: string | null;
}

export type InterpolatingTodo = (id?: number, completed?: boolean) => string;
export type InterpolatingUser = (id?: number) => string;
export type TotalInterpolation = InterpolatingTodo;
