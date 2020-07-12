export interface Todo {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
