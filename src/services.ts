import { FilterBy } from './types/FilterBy';

export const todoMatchesQuery = (query: string, title: string) =>
  title.toLowerCase().includes(query.trim().toLowerCase());

export const filterByStatus = (completed: boolean, filterBy: FilterBy) => {
  switch (filterBy) {
    case FilterBy.Active:
      return !completed;
    case FilterBy.Completed:
      return completed;
    default:
      return true;
  }
};
