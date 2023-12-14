import { Data, Options } from './types/types';

export const getCurrentData = <T>(
  data: Array<T & Data>,
  {
    query,
    sortBy,
  }: Options): T[] => {
  let copiedData = [...data];

  if (query) {
    copiedData = copiedData.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (typeof sortBy === 'number') {
    copiedData = copiedData.filter(({ completed }) => {
      return completed === Boolean(sortBy);
    });
  }

  return copiedData;
};
