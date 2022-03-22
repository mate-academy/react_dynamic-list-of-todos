export interface Todo {
  completed: boolean,
  id: number,
  title: string,
  userId: number,
}

export type TodoProps = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  search: (event: string) => void,
  selectedUserId: number,
  display: (format: string) => void,
  curentDisplay: string,
  loading: boolean,

};

export type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

export type CurrentUserProps = {
  selectedUserId: number,
};
