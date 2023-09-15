export enum TodoStates {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filter = {
  select: TodoStates;
  input: string;
};
