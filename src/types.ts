export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressProps;
  phone: string;
  website: string;
  company: CompanyProps;
}

interface CompanyProps {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface AddressProps {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UsersTodo extends TodoProps {
  user: UserProps;
}
