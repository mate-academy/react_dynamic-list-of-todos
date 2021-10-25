/// <reference types="react-scripts" />

type Todo = {
  id: string;
  userId: string;
  completed: boolean;
  title: string;
};

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
