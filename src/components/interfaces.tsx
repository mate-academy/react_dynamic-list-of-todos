export interface User {
  id: number;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export interface AppState {
  todos: Todo[];
  order: {
    sortId: boolean;
    sortName: boolean;
    sortTitle: boolean;
    sortStatus: boolean;
  };
  isLoading: boolean;
  isLoadDatas: boolean;
}

export interface ControlPanel {
  name: string;
  link: string;
  clickEvent: () => void;
}
