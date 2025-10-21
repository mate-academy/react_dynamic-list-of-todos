export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const FILTERS = [Filter.All, Filter.Active, Filter.Completed] as const;
