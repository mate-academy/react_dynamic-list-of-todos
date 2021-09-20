/// <reference types="react-scripts" />

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
