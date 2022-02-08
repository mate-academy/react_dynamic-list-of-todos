/// <reference types="react-scripts" />

type Todo = {
  id: string,
  completed: boolean;
  title: string,
  userId: number,
  updatedAt: string,
  createdAt: string,
};

interface User {
  id: number,
  name: string,
  username: string,
  phone: string,
  email: string,
}
