export enum FilterEnum {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filter = {
  select: FilterEnum;
  input: string;
};
