export type Data = {
  title: string;
  completed: boolean;
};

export enum SortBy {
  All = '',
  Active = 0,
  Completed = 1,
}

export type Options = {
  query: string;
  sortBy: SortBy;
};
