export interface TodoProps {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PreparedProps = {
  completed: boolean;
  title: string;
  user: string | undefined;
  id: number;
};

export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address?: {
    city: string;
    createdAt: string;
    id: number;
    street: string;
    suite: string;
    updatedAt: string;
    userId: number;
    zipcode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PreparedListProps {
  preparedList: PreparedProps[];
  sortTodos: (list: PreparedProps[]) => void;
}

export type SortValue = 'title' | 'completed' | 'id' | 'user';
