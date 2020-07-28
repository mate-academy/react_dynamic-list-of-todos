export interface User {
  name: string;
  userName: string;
  email: string;
  id: number;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface PreparedTodos extends Todo {
  user: User;
}
