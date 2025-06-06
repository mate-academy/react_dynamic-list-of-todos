export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodosFilterChoice {
  all = 'all',
  active = 'active',
  completed = 'completed',
}
