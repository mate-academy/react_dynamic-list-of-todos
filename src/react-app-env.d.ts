/// <reference types="react-scripts" />

type Todo = {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    title: string,
    completed: boolean,
  };
  
  interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
  }