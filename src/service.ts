import { SortType } from './types/SortType';

export const todoMatchesQuery = (query: string, title: string) =>
  title.toLowerCase().includes(query.trim().toLowerCase());

export const filterByStatus = (completed: boolean, sortBy: SortType) => {
  switch (sortBy) {
    case SortType.ACTIVE.toLowerCase():
      return !completed;
    case SortType.COMPLETED.toLowerCase():
      return completed;
    default:
      return true;
  }
};
