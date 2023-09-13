import { User } from './User';

export type UserContextType = {
  user: User | null;
  onUpdateUser: (id: number) => void;
  userLoading: boolean;
};
