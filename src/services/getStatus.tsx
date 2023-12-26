import { Status } from '../types/Status';

export const getStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { value } = e.target;

  if (value !== 'all') {
    return value === 'active' ? Status.active : Status.completed;
  }

  return Status.all;
};
