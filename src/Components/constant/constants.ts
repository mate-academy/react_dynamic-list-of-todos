import { User } from '../interfaces/interfaces';

export const URL_TODOS = 'https://mate.academy/students-api/todos';
export const URL_USERS = 'https://mate.academy/students-api/users';

export const noUser: User = {
  id: 0,
  username: 'no name',
  email: 'no email',
  website: 'no site',
  name: 'no name',
  phone: 'no phone',
  createdAt: new Date(),
  updatedAt: new Date(),
  address: null,
};
