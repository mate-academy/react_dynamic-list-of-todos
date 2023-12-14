type Data = {
  title: string;
  completed: boolean;
};

export enum SortBy {
  All = '',
  Active = 0,
  Completed = 1,
}

type Options = {
  query: string;
  sortBy: keyof typeof SortBy;
};

export const getCurrentData = <T>(
  data: Array<T & Data>,
  {
    query,
    sortBy,
  }: Options): T[] => {
  let copyedData = [...data];

  if (query) {
    const queryStr = query.toLowerCase();

    copyedData = copyedData.filter(item => {
      const title = item.title.toLowerCase();

      return title.includes(queryStr);
    });
  }

  if (SortBy[sortBy] === SortBy.Active || SortBy[sortBy] === SortBy.Completed) {
    copyedData = copyedData.filter(item => {
      return item.completed === Boolean(SortBy[sortBy]);
    });
  }

  return copyedData;
};
