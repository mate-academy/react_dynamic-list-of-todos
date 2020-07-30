import { User } from '../interfaces';

const noAddress = {
  id: 0,
  userId: 0,
  street: '',
  suite: '',
  city: '',
  zipcode: '',
  createdAt: '',
  updatedAt: '',
};

export const noUser: User = {
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  createdAt: '',
  updatedAt: '',
  address: noAddress,
};
