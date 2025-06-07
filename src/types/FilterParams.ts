export enum FilterParams {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export type ParamsKeys = keyof typeof FilterParams;
