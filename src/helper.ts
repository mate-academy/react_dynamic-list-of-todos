import { Data, SortBy, Options } from './types/types';

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

  if (sortBy) {
    if (typeof SortBy[sortBy] === 'number') {
      copiedData = copiedData.filter(({ completed }) => {
        return completed === Boolean(SortBy[sortBy]);
      });
    }
  }

  return copiedData;
};
