interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserFromServer {
  id: number;
  name: string;
}

interface TodosFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserFromServer;
}
