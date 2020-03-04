interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
}

interface PreparedTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | undefined;
}
