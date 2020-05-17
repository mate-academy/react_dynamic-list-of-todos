// eslint-disable-next-line
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

interface TodoNormalize {
  title: string;
  id: number;
  userId: number;
  completed: boolean;
  user: User;
}
