interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ApdateTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: Users;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}
