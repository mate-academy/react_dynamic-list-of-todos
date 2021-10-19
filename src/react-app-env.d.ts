/// <reference types="react-scripts" />

type Todo = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  title: string;
  completed: boolean;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

type FilterOption = 'all' | 'active' | 'completed';
