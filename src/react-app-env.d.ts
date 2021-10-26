interface Todo {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  userId: number,
  title: string,
  completed: boolean,
}

interface User {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}
