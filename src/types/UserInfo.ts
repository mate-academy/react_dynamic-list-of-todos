import { Todo } from './Todo';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  todo: Todo;
}
