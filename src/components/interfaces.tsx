interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  [key: string]: number | string | Address | Company;
  username: string;
  address: Address;
  company: Company;
}

export interface Todo {
  [key: string]: number | string | boolean | User;
  title: string;
  id: number;
  user: User;
}

export interface AppState {
  todos: Todo[];
  sortedBy: string;
  isLoading: boolean;
  isLoaded: boolean;
}

export interface ControlPanel {
  name: string;
  sortedName: string;
  link: string;
  clickEvent: (field: string) => void;
}
