interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserFromServer {
  id: number;
  name: string;
  // username: string;
  // email: string;
  // address: Address;
  // geo: Geo;
  // phone: string;
  // website: string;
  // company: Company;
}

interface TodosFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserFromServer;
}
