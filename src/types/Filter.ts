export enum FilterField {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Filter {
  filterField: FilterField;
  query: string;
}
