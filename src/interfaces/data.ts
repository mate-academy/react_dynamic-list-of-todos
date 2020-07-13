export interface Todo {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  readonly id: number;
  readonly name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoModifiedType {
  [key: string]: number | string | boolean;
}

export interface TodoModified extends TodoModifiedType {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
  readonly userName: string;
}
