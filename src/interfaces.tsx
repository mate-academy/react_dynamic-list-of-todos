interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface TodoInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoWithUserInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserInterface;
}
