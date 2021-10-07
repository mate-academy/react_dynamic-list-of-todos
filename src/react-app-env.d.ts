/// <reference types="react-scripts" />

interface Todo {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  completed: boolean;
}

interface Status {
  all: 'all';
  active: 'active';
  completed: 'completed';
}
