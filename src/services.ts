import { FilterType } from './types/FilterType';

export const todoMatchesQuery = (query: string, title: string) =>
  title.toLowerCase().includes(query.trim().toLowerCase());

export const filterByStatus = (completed: boolean, filterBy: FilterType) => {
  switch (filterBy) {
    case FilterType.Active:
      return !completed;
    case FilterType.Completed:
      return completed;
    default:
      return true;
  }
};
