interface GeoInt {
  lat: string;
  lng: string;
}

interface AddressInt {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoInt;
}

interface CompanyInt {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressInt;
  phone: string;
  website: string;
  company: CompanyInt;
}

export interface TodoInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PreparedTodoInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserInterface;
}
