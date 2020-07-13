// eslint-disable-next-line
/// <reference types="react-scripts" />

interface ButtonProps {
  beforeLoaded: () => void;
  afterLoaded: (list: PreparedProps[]) => void;
}

type TodosWithUsers = {
  user: string | undefined;
  title: string;
  complete: boolean;
  id: number;
};

interface Todos {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Users {
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
