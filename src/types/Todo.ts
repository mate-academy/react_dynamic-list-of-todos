export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum Status {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

export interface Filter {
  query: string;
  status: Status;
}
