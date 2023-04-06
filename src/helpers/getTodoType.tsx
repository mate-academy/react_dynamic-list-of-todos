import { SortType } from '../enums/SortType';

export const getTodoType = (type: string) => {
  switch (type) {
    case SortType.Active:
      return SortType.Active;

    case SortType.Completed:
      return SortType.Completed;

    case SortType.All:
    default:
      return SortType.All;
  }
};
