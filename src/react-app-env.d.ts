/// <reference types="react-scripts" />

interface TodoUpdateType {
  complete: boolean;
}

type SetUserIdCallback = Dispatch<SetStateAction<number>>;

interface SelectedUserId {
  selectedUserId: number;
  setSelectedUserId: SetUserIdCallback;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
