/// <reference types="react-scripts" />

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

type Status = 'all' | 'active' | 'completed';
