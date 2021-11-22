/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
};

type User = {
  id: number,
  name: string,
  username: string | null,
  email: string | null,
  phone: string | null,
  website: string | null
};
