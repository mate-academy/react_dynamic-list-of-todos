export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  isSelected?: boolean;
}
