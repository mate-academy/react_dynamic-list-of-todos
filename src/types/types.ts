export interface Todo {
  completed: boolean,
  id: number,
  title: string,
  userId: number,
}

export type TodoProps = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  selectedUserId: number,
};

export type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

export type CurrentUserProps = {
  users: User[],
  selectedUserId: number,
};
