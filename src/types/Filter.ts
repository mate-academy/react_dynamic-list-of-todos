export enum FilterField {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Filter {
  field: FilterField;
  query: string;
}
