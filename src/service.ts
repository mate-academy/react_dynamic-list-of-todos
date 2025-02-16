import { SortType } from './types';

export const todoMatchesQuery = (query: string, title: string) =>
  title.toLowerCase().includes(query.trim().toLowerCase());

export const filterByStatus = (completed: boolean, sortBy: SortType) => {
  switch (sortBy) {
    case SortType.Active.toLowerCase():
      return !completed;
    case SortType.Completed.toLowerCase():
      return completed;
    default:
      return true;
  }
};
