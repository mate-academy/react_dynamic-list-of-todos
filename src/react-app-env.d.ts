interface Todo {
  title: string;
  id: number;
  userId: number;
  completed: boolean;
}

interface User {
  name: string;
  id: number;
}

interface TodoNormalized {
  title: string;
  id: number;
  userId: number;
  completed: boolean;
  user: User;
}
