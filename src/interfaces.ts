export interface Todos {
  [x: string]: any;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: Users;
}

export interface Users {
  id: number;
  name: string;
  username: string;
  address: {};
  phone: string;
  website: string;
  company: {};
}
