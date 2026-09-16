export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export type TodoOptions = {
  filterType: FilterType;
  query: string;
};
