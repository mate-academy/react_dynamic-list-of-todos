export interface Todo extends TodoFromServer {
  [key: string]: string | number | boolean | User;
  id: number;
  title: string;
  user: User;
}

export interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  [key: string]: string | number | AddressType | CompanyType;
  username: string;
  address: AddressType;
  company: CompanyType;
}

export interface SortButton {
  [key: string]: string;
}

export interface SortFields {
  [key: string]: string;
}

type AddressType = {
  street: string;
  suite: string;
  sity: string;
  zipcode: string;
  geo?: GeoType;
};

type CompanyType = {
  name: string;
  catchPhrase?: string;
  bs?: string;
};

type GeoType = {
  lat: string;
  lng: string;
};
