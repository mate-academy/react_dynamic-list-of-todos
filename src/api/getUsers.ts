import { usersURL } from '../utils/constants';
import { UserType } from '../utils/interfaces';
import { getData } from './getData';

export const getUsers = async (): Promise<UserType[]> => {
  return getData<UserType[]>(usersURL);
};
