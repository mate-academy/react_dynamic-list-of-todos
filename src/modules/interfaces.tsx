export interface Task {
  completed: boolean;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface Address {
  city: string;
  createdAt: string;
  id: number;
  street: string;
  suite: string;
  updatedAt: string;
  userId: number;
  zipcode: string;
}

export interface User {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  updatedAt: string;
  username: string;
  website: string;
  address: Address;
}

export interface DownloadTaskElements {
  setButtonText: Function;
  getTask: Function;
  buttonText: string;
}

export interface DownloadRenderTaskList {
  users: User[] | [];
  tasks: Task[] | [];
}
