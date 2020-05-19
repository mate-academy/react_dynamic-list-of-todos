// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: Users;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {};
  phone: string;
  website: string;
  company: {};
}
