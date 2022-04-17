/// <reference types="react-scripts" />

type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
};

interface User {
  username: string,
  name: string,
  email: string,
  id: number,
  phone: string,
}
