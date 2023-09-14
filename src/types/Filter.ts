export enum FilterEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export type Filter = {
  select: FilterEnum;
  input: string;
};
